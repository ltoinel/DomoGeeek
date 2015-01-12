/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Multipush API HTTP Client
 * @author: ltoinel@free.fr
 */

/**
 * Multipush client API
 */
exports.send = function(url, subject, message, canal) {

	// Request
	var request = require('request');

	if (Array.isArray(canal)) {
		canal = canal.join();
	}
	// Configure the request to the multipush service
	var options = {
		url : url,
		method : 'GET',
		qs : {
			'subject' : subject,
			'message' : message,
			'canal' : canal
		}
	};

	// Sending the request
	request(options, function(error, response, body) {
		if (!error && response.statusCode == 201) {
			console.info('Multipush request sent');
		} else {
			console.error('Multipush request : %s', error);
		}
	});
};