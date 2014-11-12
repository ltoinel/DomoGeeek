/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence module for the Aenon Lab Multisensor.
 * @author: ltoinel@free.fr
 */
 
// Local require
var bus = require( '../bus' );
var config = require('./../config');

// The command to listen
var COMMAND_CLASS_SENSOR_BINARY = 48;

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event.
 * This event is sent on my Aenon Lab Multisensor when a presence is detected.
 */
bus.on(COMMAND_CLASS_SENSOR_BINARY, function(nodeid, value){

	if(value['label'] == "Sensor"){
		// TODO
	}
});

/**
 * This function sends an alert to all the devices.
 */
function sendAlert(){
	
	// Request
	var request = require('request');
	
	// Somebody has been detected
	if (value['value'] == true){
		
		var subject = 'Alerte intrusion';
		var message = 'Une présence a été détectée';

	// Nobody's here since few minutes
	} else {

		var subject = 'Alerte intrusion terminée';
		var message = 'Aucune présence détectée depuis 4 minutes';
	}
	
     // Configure the request to the multipush service
     var options = {
        url: "http://localhost:9091/multipush",
        method: 'GET',
        qs: {'subject': subject, 'message': message, 'canal': 'mail,sms,openkarotz'}
     } 
     
     // Sending the request
     request(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
        	console.info('Alert sent');
        } else {
        	console.error('Alert error : %s', error);
        }
     });
}