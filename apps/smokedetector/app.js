/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Smoke detector alarm.
 * @author: ltoinel@free.fr
 */

// Loading MQTT 
var mqtt = require('mqtt');

// Global settings
var gcfg = require('../../config');

//Local require
var config = require('../config');
var pjson = require('./package.json');

//Create an MQTT client
var client = mqtt.connect(gcfg.mqtt.uri);

/**
 * MQTT Basic
 */
client.on('message', function(topic, message, packet) {

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
			client.publish('multipush', JSON.stringify(multipush));
		}
	}
});

// MQTT Connection
client.on('connect', function(){
	console.log("Connected to the MQTT broker");
	
	// The client subscribe to the bus
	client.subscribe('basic');
});

// MQTT Close connection
client.on('close', function(){
	console.log("Disconnected from the MQTT broker");
});

// MQTT Offline
client.on('offline', function(){
	console.log("Going offline ...");
});

// MQTT error
client.on('error', function(error){
	console.error(error);
});

//Starting the service
console.info("Starting DomoGeeek %s v%s", pjson.name, pjson.version);

//Cleaning resources on SIGINT
process.on('SIGINT', stop);

//Stop the process properly
function stop(){
	
	// Stopping the service
	console.info("Stopping DomoGeeek %s v%s", pjson.name, pjson.version);
	
	// Disconnecting the client
	client.end();

	// Stopping the process
	process.exit();
}

