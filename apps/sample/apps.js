/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Sample module for DomoGeeek
 * @author: ltoinel@free.fr
 */

// Load the module dependency
var module = require("../../libs/module");

// Define a new module
var sample = new module( __dirname);

// Start the module
sample.start(function(){
	
	// The client subscribe to the MQTT bus
	sample.client.subscribe('meter');
});

sample.client.on('message', function(topic, message, packet) {
	
		// TODO
});
