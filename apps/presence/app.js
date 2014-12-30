/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence main app
 * @author: ltoinel@free.fr
 */

// Global require
var express = require('express');

// Local require
var config = require('./config');
var multipush = require('../../libs/multipush');

// Force the presence for guests
var presence = false;
var date = null;

// Init the Express App
var app = express();

/**
 * Disable the presence.
 */
function disablePresence(){
	presence = false;
	date = null;
	console.log("Presence forced to false");
}

/**
 * Force the presence.
 */
function forcePresence(){
	presence = true;
	date = Date.now() + (config.forceperiod * 60 * 1000);
	console.log("Presence forced to true until => " + date);
}

/**
 * Force the presence to true or false for the guests when the owners of the home are not present.
 *
 * HTTP GET /presence
 */
app.get('/presence/:status',  function (req, resp, next) {
	
	if (req.params.status === "true"){
		forcePresence();

	} else if (req.params.status === "false"){
		disablePresence();
		
	} else {
		// Unknown parameter
		resp.status(400).send();
	}
	
	// OK, presence status changed
	resp.status(204).send();
});


/**
 * Get the presence. This presence can be forced or not.
 *
 * HTTP GET /presence
 */
app.get('/presence',  function (req, resp, next) {

	// Check the presence force timestamp
	if (presence && Date.now() > date){
		console.log("Presence has expired");
		disablePresence();
	}
	
	// If the presence is enabled
	if (presence){
		resp.send(200, {presence: true});
	
	// Presence is disabled
	} else {
		
		// We check if there is a well known mobile device connected to the Wifi network.
		checkWifiDevices(config.phones, function(presence){
			
			// If a well known device is found, we force the presence for a delay of 30 minutes.
			if (presence){
				forcePresence();
			}
			
			resp.send(200, {presence: presence});
		});
	}
});


/** 
 * Check the presence of well known Wifi devices.
 */
function checkWifiDevices(phones,callback){
	
	var freebox = require('../../libs/freebox');
	console.log("Check wifi devices ....");
	
	freebox.connect({
		'app_token' : config.freebox.app_token, 
		'track_id'  : config.freebox.track_id
	});
	
	freebox.on('ready', function(box) {
		
		// Removing the listener
		freebox.removeAllListeners('ready');
		
		// Retrieving wifi devices
		freebox.browserPub(function(devices){
			console.log("Retrieve wifi devices");
			
			var presence = false;
			devices.forEach(function(device){
		
				// We check if one of our smartphone devices are connected
				if (phones.indexOf(device.id) != -1){
					if (device.active == true){
							presence = true;
					        console.log("Device detected : " + device.primary_name);
					}
				}
			});

			callback(presence);
		})
	});
}

// Starting 
console.info("Starting DomoGeeek Presence v%s",config.version);

// Starting the REST server
app.listen(config.port); 