
// Local require
var bus = require( '../bus' );

// The command to listen
var COMMAND_CLASS_SENSOR_BINARY = 48;

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event.
 * This event is sent on my Aenon Lab Multisensor when a presence is detected.
 */
bus.on(COMMAND_CLASS_SENSOR_BINARY, function(nodeid, value){

	if(value['label'] == "Sensor"){
		
		// Request
		var request = require('request');
		
		// Somebody has been detected
		if (value['value'] == true){
			
			var subject = 'Présence détectée';
			var message = 'Une présence a été détectée';

		// Nobody's here since few minutes
		} else {

			var subject = 'Aucune présence';
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
});

