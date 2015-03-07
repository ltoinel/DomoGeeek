/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Energy module for the Aenon Lab HEM2.
 * @author: ltoinel@free.fr
 */

// Local require
var openkarotz = require("../../libs/openkarotz");
var module = require("../../libs/module");


// Load the module
var smartMeter = new module( __dirname);

// Start the connection
smartMeter.start(function(){
	
	// The client subscribe to the bus
	smartMeter.client.subscribe('meter');
});


// Last power notification
var lastPowerNotification = 0;

/**
 * RGB to Hex utils
 */ 
function rgbToHex(r, g, b) {
	return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * MQTT Meter
 */
smartMeter.client.on('message', function(topic, message, packet) {

	console.log("Receiving a message : " + topic +" => " + message);
	
	// We transform the JSON string message into an object
	var params = JSON.parse(message);

	if (topic === "meter"){

		// Current power consumed
		if (params.label == "Power") {
			var power = params.value;

			// Max possible consume is 12000 Wh
			var n = power / config.max * 100;
			var red = (255 * n) / 100;
			var green = (255 * (100 - n)) / 100;
			var blue = 0;

			// Get the RGB color
			var color = rgbToHex(red, green, blue);

			// Change the OpenKarotz led
			openkarotz.led(config.openkarotz, color);

			// We reset the notification
			if (power > config.alert.level) {

				if ((power > (lastPowerNotification + (lastPowerNotification * 0.2)) || (power < (lastPowerNotification - (lastPowerNotification * 0.2))))) {

					lastPowerNotification = power;
					openkarotz.talk(config.openkarotz,config.alert.message.format(power));
				}

			} else {
				lastPowerNotification = 0;
			}
		}
	}
});


