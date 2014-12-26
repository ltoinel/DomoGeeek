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
var forcePresence = false;
var forceDate = null;

// Init the Express App
var app = express();

/**
 * Force the presence to true or false for the guests when the owners of the home are not present.
 *
 * HTTP GET /presence
 */
app.get('/presence/:status',  function (req, resp, next) {
	
	if (req.params.status === "true"){
		forcePresence = true;
		forceDate = Date.now() + (config.forceperiod * 60 * 60 * 1000);
	
		multipush.send(config.multipush,"","Presence activée pour une durée de "+config.forceperiod+" heures","openkarotz");
		console.log("Presence forced to true");
		
	} else if (req.params.status === "false"){
		forcePresence = false;
		
		multipush.send(config.multipush,"","Presence désactivée","openkarotz");
		console.log("Prensence forced to false");
		
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
	if (forcePresence && Date.now() > forceDate){
		console.log("Presence expired");
		forcePresence = false;
	}
	
	if (forcePresence){
		resp.send(200, {presence: true});
	} else {
		// We check if there is a well known mobile device connected to the Wifi network
		checkWifiDevices(config.phones, function(presence){
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
		
				// We check if one of our devices are connected
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