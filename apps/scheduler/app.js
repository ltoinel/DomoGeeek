/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Scheduler main app
 * @author: ltoinel@free.fr
 */


//Loading MQTT 
var mqtt = require('mqtt');

//Global settings
var gcfg = require('../../config');

// Local require
var config = require('./config');
var pjson = require('./package.json');

// Starting 
console.info("Starting DomoGeeek %s v%s",pjson.name, pjson.version);

//Create an MQTT client
var client = mqtt.connect(gcfg.mqtt.uri);

// Loading the available tasks 
var tasks = require('./tasks/index');

// On MQTT connection
client.on('connect', function(){
	console.log("Connected to the MQTT broker");
});

// On MQTT connection close
client.on('close', function(){
	console.log("Disconnected from the MQTT broker");
});

// On MQTT offline
client.on('offline', function(){
	console.log("Going offline ...");
});

// On MQTT error
client.on('error', function(error){
	console.error(error);
});

//Cleaning resources on SIGINT
process.on('SIGINT', stop);

// Stop the process properly
function stop(){
	
	// Stopping the service
	console.info("Stopping DomoGeeek %s v%s", pjson.name, pjson.version);
	
	// Disconnecting the client
	client.end();

	// Stopping the process
	process.exit();
}