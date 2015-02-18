/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence module based on the MQTT broker
 * @author: ltoinel@free.fr
 */

// Local require
var config = require('../config');

// Shared libs
var presence = require('../../../libs/presence');
var multipush = require('../../../libs/multipush');

// The command to listen
var COMMAND_CLASS_SENSOR_BINARY = 48;

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event. This event is sent on my
 * Aenon Lab Multisensor when a presence is detected.
 */
bus.on(COMMAND_CLASS_SENSOR_BINARY, function(nodeid, value) {

	global.data.presence = new Date();
	if (value.label == "Sensor" && value.value === true) {
		presence.check(config.presence, sendAlert);
	}
});

/**
 * This function sends an alert to all the devices.
 */
function sendAlert(presence) {

	if (!presence) {

		console.log("Abnormal presence detected");
		multipush.send(config.multipush, config.presence.alert.subject, config.presence.alert.message, "sms,openkarotz");

	} else {
		console.log("Normal presence detected, well known Wifi devices found");
	}
}