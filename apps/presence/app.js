/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence main app
 * @author: ltoinel@free.fr
 */

// Global require
var fs = require('fs');

// Local require
var freebox = require('./libs/freebox');

// We check the Freebox Token
if (fs.existsSync('./token.json')) {
	console.info("Freebox authorisation token found !");
	var token = require('./token.json');

} else {
	// Registration
	freebox.connect();
	freebox.on('ready', function(box) {
		freebox.register();
		console.error("Please, accept the application on your Freebox !");

		freebox.on('registered', function(receivedToken) {
			token = receivedToken;

			// We persist the token for a futur use
			fs.writeFile("./token.json", JSON.stringify(receivedToken));
		});
	});
}

// Load the module dependency
var module = require("../../libs/module");

// Define a new module
var presence = new module(__dirname);

// Start the module
presence.start(function() {

	// The client subscribe to the MQTT bus
	presence.client.subscribe('presence');
});

// Respond the presence
presence.client.on('message', function(topic, message, packet) {

	if (topic === "presence") {
		try {
			var params = JSON.parse(message);

			// We check if a known device is into the house
			if (params.action === "check") {

								
				checkPresence(function(status){
					var response = {action:"report",status:status,timestamp:Date.now()};
					presence.client.publish('presence', JSON.stringify(response));
				});
			}
			
		} catch (e) {
			presence.logger.error(e, "Bad message");
		}
	}
});

// Force the presence using the settings for guests
var presenceDetected = false;
var date = null;

/**
 * Disable the presence.
 */
function disablePresence() {
	presenceDetected = false;
	date = null;
	presence.logger.debug("Presence forced to false");
}

/**
 * Force the presence during a period
 */
function forcePresence(period) {
	if (period === undefined) {
		period = presence.config.forceperiod;
	}
	presenceDetected = true;
	date = Date.now() + (period * 60 * 1000);
	presence.logger.debug("Presence forced to true until => " + date);
}

/**
 * Get the presence. This presence can be forced or not.
 * 
 * HTTP GET /presence
 */
function checkPresence(callback) {

	// Check the presence force timestamp
	if (presenceDetected && Date.now() > date) {
		presence.logger.debug("Presence cache has expired");
		disablePresence();
	}

	// If a presence has been found during the configured period
	if (presenceDetected) {
		callback(true);

		// If a presence has not been found during the configured period
	} else {

		// We check if the current time is a forced presence.
		if (checkForcePresence()) {
			presence.logger.info("Current hour has a configured presence to true");
			callback(true);

		} else {

			// We check if there is a well known mobile device connected to the
			// Wifi network.
			checkWifiDevices(presence.config.phones,
				function(presenceDetected) {

					// If a well known device is found, we force the
					// presence for a delay of 30 minutes.
					if (presenceDetected) {
						forcePresence();
					}

					callback(presenceDetected);
				});
		}
	}
}

/**
 * Check if the current time has a force presence in configuration.
 */
function checkForcePresence() {
	var now = new Date();
	var forcepresence = presence.config.forcepresence[now.getDay()];
	if (forcepresence.indexOf(now.getHours()) != -1) {
		return true;
	}
}

/**
 * Check the presence of well known Wifi devices.
 */
function checkWifiDevices(phones, callback) {

	console.log("Check wifi devices ....");

	freebox.connect({
		'app_token' : token.app_token,
		'track_id' : token.track_id
	});

	freebox.on('ready', function(box) {

			// Removing the listener
			freebox.removeAllListeners('ready');

			// Retrieving wifi devices
			freebox.browserPub(function(devices) {
				presence.logger.info("Retrieve wifi devices");

				var deviceDetected = false;
				devices.forEach(function(device) {

					// We check if one of our smartphone devices are connected
					if (phones.indexOf(device.id) != -1) {

						// If a device is active
						if (device.active === true) {
							deviceDetected = true;
							presence.logger.info("Device detected : " + device.primary_name);

						// If a device was active few minutes ago
						} else if (new Date((device.last_time_reachable * 1000) + (presence.config.lastactivetime * 60 * 1000)) > new Date()) {
							deviceDetected = true;
							presence.logger.info("Device detected few minutes ago : " + device.primary_name + " => " + new Date(device.last_time_reachable * 1000));
						}
					}
				});

				callback(deviceDetected);
			});
		});
}
