// Global require
var events = require('events');

//Event emitter
var eventEmitter = new events.EventEmitter();

var COMMAND_CLASS_SENSOR_BINARY = "48";

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event.
 */
eventEmitter.on(COMMAND_CLASS_SENSOR_BINARY, function(value){

	if(value['label'] == "Sensor"){
		
		if (value['value'] == true){
			console.log("Somebody");
		} else {
			console.log("nobody");
		}
		
	}
});

