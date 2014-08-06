// Global require
var eventEmitter = require('events').EventEmitter();;


var COMMAND_CLASS_SENSOR_BINARY = "48";

/**
 * We listen for a COMMAND_CLASS_SENSOR_BINARY event.
 */
eventEmitter.on("48", function(nodeid,value){
	console.log("received");
	if(value['label'] == "Sensor"){
		
		if (value['value'] == true){
			console.log("Somebody");
		} else {
			console.log("nobody");
		}
		
	}
});

