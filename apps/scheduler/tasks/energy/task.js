/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Task that announces the energy consumption of the home.
 * @author: ltoinel@free.fr
 */

var CronJob = require('cron').CronJob;

// Local require
var config = require('./config');

var currentConsumption = null;
var previousConsumption = null;

/**
 * Subscribe to the meter topic
 */
global.scheduler.client.on('connect', function(){
	
	// The client subscribe to the bus
	global.scheduler.client.subscribe('meter');
});


/**
 * On a meter message ...
 */
global.scheduler.client.on('message', function(topic, message, packet) {

	console.log("Receiving a message : " + topic +" => " + message);
	
	// We transform the JSON string message into an object
	if (topic === "meter"){
		
		var params = JSON.parse(message);
		if (params.label === "Energy" ){
			currentConsumption = params.value;
		}
	}
});

/**
 * Energy consumption announcement
 */
var energy = new CronJob(config.energy.time, function() {

	if (previousConsumption !== null){
		// How much energy the house consumes
		var consumption = currentConsumption - previousConsumption;
		
		// Create message
		var message = {};
		message.subject = "Energy";
		message.content = config.energy.message.format(consumption);
		message.canal = ["openkarotz"];

		// Publishing a message
		global.client.publish('multipush', JSON.stringify(message));
		
		previousConsumption = currentConsumption;
		
	}

}, undefined, false, config.timezone).start();
