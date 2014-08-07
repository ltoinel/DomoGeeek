// Global require
var event = require( '../event' );

var COMMAND_CLASS_SENSOR_BINARY = "48";

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event.
 */
eventEmitter.on(COMMAND_CLASS_SENSOR_BINARY, function(nodeid, value){

	console.log("Somebody");
	if(value['label'] == "Sensor"){
		
		if (value['value'] == true){
			console.log("Somebody");
		} else {
			console.log("nobody");
		}
		
	}
});

