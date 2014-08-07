// Global require
var event = require( '../event' );

var COMMAND_CLASS_SENSOR_BINARY = "48";

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event.
 * This event is sent on my Aenon Lab Multisensor when a presence is detected.
 */
event.on(COMMAND_CLASS_SENSOR_BINARY, function(nodeid, value){

	console.log("Value: %j", value);
	if(value['label'] == "Sensor"){
		
		// Somebody has been detected
		if (value['value'] == true){
			console.log("Somebody");
			
		// Nobody's here since few minutes
		} else {
			console.log("Nobody");
		}
	}
});

