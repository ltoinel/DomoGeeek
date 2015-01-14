/**
 * DomoGeeek v0.1 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Energy module for the Aenon Lab HEM2.
 * @author: ltoinel@free.fr
 */

// Local require
var bus = require('../bus');
var config = require('../config');
var openkarotz = require('../../../libs/openkarotz');

// Last power notification
var lastPowerNotification = 0;

// The command to listen
var COMMAND_CLASS_METER = 50;

// RGB to Hex
function rgbToHex(r, g, b) {
	return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * We listen for a COMMAND_CLASS_METER event. This event is sent by the Aeon
 * HEM2 power energy meter.
 */
bus.on(
		COMMAND_CLASS_METER,
		function(nodeid, value) {


			// Current power consumed
			if (nodeid == 7 && value.label == "Power") {
				var power = value.value;

				// Max possible consume is 12000 Wh
				var n = power / config.max * 100;
				var red = (255 * n) / 100;
				var green = (255 * (100 - n)) / 100;
				var blue = 0;

				var color = rgbToHex(red, green, blue);
				console.log("Color :  " + color);

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
		});
