/**
 * DomoGeeek v0.1 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: MultiPush main app
 * @author: ltoinel@free.fr
 */

// Loading MQTT 
var mqtt = require('mqtt');

// Global settings
var gcfg = require('../../config');

// Local settings
var config = require('./config');
var pjson = require('./package.json');

// Create an MQTT client
var client = mqtt.connect(gcfg.mqtt.uri);

// Loading SMS connector
if (config.sms.enabled) {
	var sms = require('./libs/sms');
}

// Loading Mail connector
if (config.mail.enabled) {
	var mail = require('./libs/mail');
}

// Loading OpenKarotz connector
if (config.openkarotz.enabled) {
	var openkarotz = require('./libs/openkarotz');
}

/**
 * MQTT multipush 
 */
client.on('message', function(topic, message, packet) {

	console.log("Receiving a message : " + topic +" => " + message);
	
	// We transform the JSON string message into an object
	var params = JSON.parse(message);

	if (topic === "multipush"){
		
		// Send a multipush message
		multipush(params.subject, params.content, params.canal);
	}
});

client.on('connect', function(){
	console.log("Connected to the MQTT broker");
	
	// The client subscribe to the bus
	client.subscribe('multipush');
});

client.on('close', function(){
	console.log("Disconnected from the MQTT broker");
});

client.on('offline', function(){
	console.log("Going offline ...");
});

client.on('error', function(error){
	console.error(error);
});

/**
 * Send notification using different channels.
 * 
 * @param subject
 *            The subject of the notification.
 * @param message
 *            The content of the message.
 */
function multipush(subject, content, canal) {

	// We send an SMS
	if (config.sms.enabled && (canal.indexOf("sms") != -1)) {
		config.sms.phone.forEach(function(phone) {
			sms.send(config.sms, phone, content);
		});
	}

	// We send an Email
	if (config.mail.enabled && (canal.indexOf("mail") != -1)) {
		config.mail.to.forEach(function(mailto) {
			mail.send(config.mail, config.mail.from, mailto, "", subject,
					content);
		});
	}

	// We make the Openkarotz talking
	if (config.openkarotz.enabled && (canal.indexOf("openkarotz") != -1)) {
		openkarotz.talk(config.openkarotz, content);
	}
}

// Starting the service
console.info("Starting DomoGeeek %s v%s", pjson.name, pjson.version);

// Cleaning resources on SIGINT
process.on('SIGINT', stop);

// Stop the process
function stop(){
	
	// Stopping the service
	console.info("Stopping DomoGeeek %s v%s", pjson.name, pjson.version);
	
	// Disconnecting the client
	client.end();

	// Stopping the process
	process.exit();
}
