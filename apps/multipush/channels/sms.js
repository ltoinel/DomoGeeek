/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: SMS Gateway HTTP Connector
 * @author: ltoinel@free.fr
 */
var request = require('request');

/**
 * Send an SMS to a phone number. I use the famous SMS Gateway on Android to
 * send free SMS
 * (https://play.google.com/store/apps/details?id=eu.apksoft.android.smsgateway&hl=fr_FR)
 * 
 * @param phone
 *            The phone number.
 * @param message
 *            The message to send.
 */
exports.send = function(config, phone, message) {

	console.info("Sending an SMS to %s", phone);

	// Set the headers
	var headers = {
		'User-Agent' : 'DomoGeeek',
		'Content-Type' : 'application/x-www-form-urlencoded'
	};

	// Configure the HTTP request
	var options = {
		url : config.url,
		method : 'GET',
		headers : headers,
		qs : {
			'phone' : phone,
			'text' : message
		}
	};

	// Send the request
	request(options, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.info('SMS sent to: %s => %s', phone, message);
		} else {
			console.error('SMS error : %s => %s', error, message);
		}
	});
};
