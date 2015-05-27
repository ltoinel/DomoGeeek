/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Abstract module implementation
 * @author: ltoinel@free.fr
 */


// Loading MQTT 
var mqtt = require('mqtt');

// Global module vars
function Module(path) {
	
	// Path of this module
	this.path = path;
	
	// Package that describes this module
	this.pjson = require(path + '/package.json');
	
	// The logger for this module
	this.logger = require('./logger').getLogger(this.pjson.name);
	
	// Share Configuration file
	this.gconfig = require('../config');

	try {
		// Package that describes this module
		this.config = require(path + '/config');
		
	} catch (ex) {
		this.logger.warn("No config file found for module : " + this.pjson.name);
	}

	// The MQTT Client
	this.client = null;
	
}

Module.prototype = {
		
	start: function(callback){

		// Starting the service
		console.info("-> Starting %s v%s", this.pjson.name, this.pjson.version);
		
		// Create an MQTT client
		this.client = mqtt.connect(this.gconfig.mqtt.uri);
		console.info("Connecting to the MQTT Server : %s", this.gconfig.mqtt.uri);
		
		// MQTT Connection
		this.client.on('connect', function(){
			console.info("Connected to the MQTT broker");
			if (callback !== undefined){
				callback();
			}
		});

		// MQTT Close connection
		this.client.on('close', function(){
			console.warning("Disconnected from the MQTT broker");
		});

		// MQTT Offline
		this.client.on('offline', function(){
			console.warning("Going offline ...");
		});

		// MQTT error
		this.client.on('error', function(error){
			console.error(error);
		});
		
		var self = this;
		
		// Cleaning resources on SIGINT
		process.on('SIGINT', function(){
			self.stop();
		});
	
	},

	stop: function(){
		
		// Stopping the service
		console.info("-> Stopping %s v%s", this.pjson.name, this.pjson.version);
		
		// Disconnecting the client
		this.client.end();
	
		// Stopping the process
		process.exit();
	}
};

// export the class
module.exports = Module;