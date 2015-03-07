/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: MultiPush main app
 * @author: ltoinel@free.fr
 */

// Local require
var module = require("../../libs/module");

// Load the module
var multiPush = new module( __dirname);
var config = multiPush.config;

// Start the connection
multiPush.start(function(){
	
	// The client subscribe to the bus
	multiPush.client.subscribe('multipush');
	
	// Loading SMS connector
	if (multiPush.config.sms.enabled) {
		var sms = require('./channels/sms');
	}

	// Loading Mail connector
	if (multiPush.config.mail.enabled) {
		var mail = require('./channels/mail');
	}

	// Loading OpenKarotz connector
	if (multiPush.config.openkarotz.enabled) {
		var openkarotz = require('../../libs/openkarotz');
	}
});


/**
 * MQTT multipush 
 */
multiPush.client.on('message', function(topic, message, packet) {

	console.log("Receiving a message : " + topic +" => " + message);
	
	// We transform the JSON string message into an object
	var params = JSON.parse(message);

	if (topic === "multipush"){
		
		// Send a multipush message
		sendMessage(params.subject, params.content, params.chanel);
	}
});




/**
 * Send notification using different channels.
 * 
 * @param subject
 *            The subject of the notification.
 * @param message
 *            The content of the message.
 */
function sendMessage(subject, content, chanel) {

	// We send an SMS
	if (config.sms.enabled && (chanel.indexOf("sms") != -1)) {
		config.sms.phone.forEach(function(phone) {
			sms.send(config.sms, phone, content);
		});
	}

	// We send an Email
	if (config.mail.enabled && (chanel.indexOf("mail") != -1)) {
		config.mail.to.forEach(function(mailto) {
			mail.send(config.mail, config.mail.from, mailto, "", subject,
					content);
		});
	}

	// We make the Openkarotz talking
	if (config.openkarotz.enabled && (chanel.indexOf("openkarotz") != -1)) {
		openkarotz.talk(config.openkarotz, content);
	}
}


