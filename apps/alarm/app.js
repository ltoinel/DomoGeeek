/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence module based on the MQTT broker
 * @author: ltoinel@free.fr
 */

// Loading MQTT 
var mqtt = require('mqtt');

// Global settings
var gcfg = require('../../config');

// Local require
var config = require('../config');
var pjson = require('./package.json');

//Create an MQTT client
var client = mqtt.connect(gcfg.mqtt.uri);
var askPresence = false;

/**
 * MQTT sensorBinary & Presence 
 */
client.on('message', function(topic, message, packet) {

	console.log("Receiving a message : " + topic +" => " + message);
	
	// SensorBinary message
	if (topic === "sensorBinary"){
		
		// We transform the JSON string message into an object
		var params = JSON.parse(message);
		
		if (params.label == "Sensor" && params.value === true) {
			presence.check(config.presence, sendAlert);
		}

		// Publishing a message
		client.publish('presence', '?');
		askPresence = true;
	
	// Presence message
	} else if (topic === "presence"){
		
		if (askPresence === true){
			if (message === "true"){
				
				console.log("Abnormal presence detected");
				
				// Create message
				var multipush = {};
				multipush.subject = config.presence.alert.subject;
				multipush.content = config.presence.alert.message;
				multipush.canal = ["sms","openkarotz"];
	
				// Publishing a message
				client.publish('multipush', JSON.stringify(message));
				
			} else if (message === "false"){
				console.log("Normal presence detected, well known Wifi devices found");
			}
			
			askPresence = false;
		}
	}
});

// MQTT Connection
client.on('connect', function(){
	console.log("Connected to the MQTT broker");
	
	// The client subscribe to the bus
	client.subscribe('presence');
	client.subscribe('sensorBinary');
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
