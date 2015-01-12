/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence API HTTP Client
 * @author: ltoinel@free.fr
 */

/**
 * Presence client API
 */
exports.check = function(serviceUrl, callback) {

	// Request
	var request = require('request');

	// Configure the request to the multipush service
	var options = {
		url : serviceUrl,
		method : 'GET'
	};

	// Sending the HTTP request
	request(options, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			response = JSON.parse(body);
			callback(response.presence);
		} else {
			console.error("Presence API request error : " + error);
			callback(false);
		}
	});
};