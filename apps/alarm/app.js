/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence module based on the MQTT broker
 * @author: ltoinel@free.fr
 */

// Local require
var module = require("../../libs/module");

// Load the module
var alarm = new module( __dirname);

// Start the connection
alarm.start(function(){
	
	// The client subscribe to the bus
	alarm.client.subscribe('presence');
	alarm.client.subscribe('sensorBinary');
});

var askPresence = false;

/**
 * MQTT sensorBinary & Presence 
 */
alarm.client.on('message', function(topic, message, packet) {

	alarm.logger.debug("Receiving a message : " + topic +" => " + message);
	
	// SensorBinary message
	if (topic === "sensorBinary"){
		
		// We transform the JSON string message into an object
		var params = JSON.parse(message);
		
		if (params.label == "Sensor" && params.value === true) {
			// Publishing a message
			alarm.client.publish('presence', '?');
			askPresence = true;
		}
		
	// Presence message
	} else if (topic === "presence"){
	
		alarm.logger.info("Abnormal presence detected");
		
		if (message.toString() !== "?" & askPresence === true){
			if (message === "true"){
				
				alarm.logger.info("Abnormal presence detected");
				
				// Create message
				var multipush = {};
				multipush.subject = config.alert.subject;
				multipush.content = config.alert.message;
				multipush.canal = config.alert.channels;
	
				// Publishing a message
				alarm.client.publish('multipush', JSON.stringify(message));
				
			} else if (message === "false"){
				alarm.logger.info("Normal presence detected, well known Wifi devices found");
			}
			
			askPresence = false;
		}
	}
});
