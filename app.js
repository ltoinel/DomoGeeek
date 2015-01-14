/**
 * DomoGeeek v0.1 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Main Broker app that retrieve messages and dispatch them to subscribers
 * @author: ltoinel@free.fr
 */

// Global require
var mosca = require('mosca');

// Local require
var config = require('./config');
var pjson = require('./package.json');

// Ascoltatore settings
var pubsubsettings = {
	type : 'mongo',
	url : config.database,
	pubsubCollection : 'ascoltatori',
	mongo : {}
};

// Mosca settings
var settings = {
	port : config.port,
	backend : pubsubsettings,
	persistence: mosca.persistence.Memory
};

// fired when a client is connected
server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});
 
// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published : ', packet.payload);
});
 
// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('Subscribed : ', topic);
});
 
// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('Unsubscribed : ', topic);
});
 
// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  console.log('Client disconnecting : ', client.id);
});
 
// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
  console.log('Client disconnected : ', client.id);
});

// We start the server
console.info("Starting %s v%s", pjson.name, pjson.version);

var server = new mosca.Server(settings);
server.on('ready', setup);

// Fired when the mqtt server is ready
function setup() {
	console.log('MQTT Broker is listening on : ' + config.port);
}