/**
 * DomoGeeek v0.1 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Main Broker app that retrieve messages and dispatch them to
 *        subscribers
 * @author: ltoinel@free.fr
 */

// Global require
var ponte = require("ponte");
var mosca = require("mosca");

// Local require
var config = require('./config');
var pjson = require('./package.json');

var opts = {
	logger : {
		level : 'info'
	},
	http : {
		port : config.port.http // TCP
	},
	mqtt : {
		port : config.port.mqtt // TCP
	},
	coap : {
		port : config.port.coap // UDP
	},
	persistence: mosca.persistence.Memory,
	
	broker : {
		// same as https://github.com/mcollina/ascoltatori#mongodb
		type : "mongo",
		url : config.broker.persistence
	}
};

// Start the server
var server = ponte(opts);

server.on("updated", function(resource, buffer) {
	console.log("Resource Updated", resource, buffer);
});

// We start the server
console.info("Starting %s v%s", pjson.name, pjson.version);
