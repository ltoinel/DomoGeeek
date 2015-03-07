/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Smoke detector alarm.
 * @author: ltoinel@free.fr
 */

// Local require
var module = require("../../libs/module");

// Load the module
var smokeDetector = new module( __dirname);

// Start the connection
smokeDetector.start(function(){
	
	// The client subscribe to the bus
	smokeDetector.client.subscribe('basic');
});

// On a message subscribed
smokeDetector.client.on('message', function(topic, message, packet) {

	console.log("Receiving a message : " + topic +" => " + message);
	
	// We transform the JSON string message into an object
	var params = JSON.parse(message);

	if (topic === "basic"){

		/**
		 * We listen for a COMMAND_CLASS_BASIC event.
		 * 
		 * This event is sent on my Fibaro Smoke Detector when smoke is detected.
		 * 
		 * Change the zwcfg to remove the mapping and add the attribute "setasreport" to
		 * true <CommandClass id="32" name="COMMAND_CLASS_BASIC" version="1"
		 * after_mark="true" setasreport="true">
		 */
		
		if (params.label == "Basic") {

			// Request
			var subject;
			var content;

			// Smoke has been detected
			if (params.value > 0) {

				subject = config.smoke.alert.subject;
				content = config.smoke.alert.subject;

				// No smoke
			} else if (params.value === 0) {

				subject = config.smoke.cancel.subject ;
				content = config.smoke.cancel.subject;
			}

			// Create message
			var multipush = {};
			multipush.subject = subject;
			multipush.content = content;
			multipush.canal = ["sms","email"];

			// Publishing a message
			smokeDetector.client.publish('multipush', JSON.stringify(multipush));
		}
	}
});


