/**
 * DomoGeeek v0.1 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Smoke detector module for the Fibaro Smoke Detector.
 * @author: ltoinel@free.fr
 */

// Local require
var bus = require('../bus');

// The command to listen
var COMMAND_CLASS_BASIC = 32;

/**
 * We listen for a COMMAND_CLASS_BASIC event.
 * 
 * This event is sent on my Fibaro Smoke Detector when smoke is detected.
 * 
 * Change the zwcfg to remove the mapping and add the attribute "setasreport" to
 * true <CommandClass id="32" name="COMMAND_CLASS_BASIC" version="1"
 * after_mark="true" setasreport="true">
 */
bus.on(
		COMMAND_CLASS_BASIC,
		function(nodeid, value) {

			if (value.label == "Basic") {

				// Request
				var request = require('request');
				var subject;
				var message;

				// Smoke has been detected
				if (value.value > 0) {

					subject = config.smoke.alert.subject;
					message = config.smoke.alert.subject;

					// No smoke
				} else if (value.value === 0) {

					subject = config.smoke.cancel.subject ;
					message = config.smoke.cancel.subject;
				}

				// Configure the request to the multipush service
				var options = {
					url : "http://localhost:9091/multipush",
					method : 'GET',
					qs : {
						'subject' : subject,
						'message' : message,
						'canal' : 'mail,sms,openkarotz'
					}
				};

				// Sending the request
				request(options, function(error, response, body) {
					if (!error && response.statusCode == 201) {
						console.info('Alert sent');
					} else {
						console.error('Alert error : %s', error);
					}
				});
			}
		});
