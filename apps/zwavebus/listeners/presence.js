// Global require
var bus = require( '../bus' );

var COMMAND_CLASS_SENSOR_BINARY = 48;

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event.
 * This event is sent on my Aenon Lab Multisensor when a presence is detected.
 */
bus.on(COMMAND_CLASS_SENSOR_BINARY, function(nodeid, value){

	if(value['label'] == "Sensor"){
		
		// Somebody has been detected
		if (value['value'] == true){
			
		// Nobody's here since few minutes
		} else {
			
			
		}
	}
});

