/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: SMS Gateway HTTP Connector
 * @author: ltoinel@free.fr
 */
var request = require('request');
var config = require('../config');

/**
 * Send an SMS to a phone number.
 * 
 * @param phone The phone number.
 * @param message The message to send.
 */
exports.send = function (config, phone,message){

     // Set the headers
     var headers = {
        'User-Agent':       'DomoGeeek',
        'Content-Type':     'application/x-www-form-urlencoded'
     }

     // Configure the request
     var options = {
        url: config.url,
        method: 'GET',
        headers: headers,
        qs: {'phone': phone, 'text': message}
     }

     // Start the request
     request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        	console.info('SMS sent to: %s => %s', phone, message);
        } else {
        	console.error('SMS error : %s => %s', error, message);
	}
     });
}


