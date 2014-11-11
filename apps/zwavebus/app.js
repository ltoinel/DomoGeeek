/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: ZwaveBus main app
 * @author: ltoinel@free.fr
 */

// Global require
var openZwave = require('openzwave');
var mongoose = require('mongoose');

// Local require
var config = require('./config');
var handler = require('./handler');

//Initialize the MongoDB connection
mongoose.connect(config.database);

// Drop the database
if (config.debug){
	mongoose.connection.on('open', function(){
		mongoose.connection.db.dropDatabase(function (err) {
  			console.log('Database dropped');
		});
	});
};

// Initialize the Zwave connector
var zwave = new openZwave(config.device, {
	modpath: config.modpath,
    saveconfig: config.saveconfig,
    logging: config.logging, 
    consoleoutput: config.consoleoutput,
    suppressrefresh: config.suppressrefresh
});

// The driver is ready
zwave.on('driver ready', handler.onDriverReady);

// The driver is failed
zwave.on('driver failed', handler.onDriverFailed);

// A node has been added to the network
zwave.on('node added', handler.onNodeAdded);

// A value has been added
zwave.on('value added', handler.onValueAdded);

// A value has been changed
zwave.on('value changed', handler.onValueChanged);

// A value has been removed
zwave.on('value removed', handler.onValueRemoved);

// A node is ready
zwave.on('node ready', handler.onNodeReady);

// A notification has been received
zwave.on('notification', handler.onNotification);

// The scan is complete
zwave.on('scan complete', function(){
	handler.onScanComplete();
	zwave.setValue(5, 0x70, 81 , 45);
    //zwave.setValue(5, 0x70, 82 , 1);
	zwave.setValue(5 ,0x70 ,5, 255);
});

// Starting 
console.info("Starting DomoGeeek Z-WaveBus v%s",config.version);

// Loading event listener
var events = require('./listeners/index');

// Zwave connect
zwave.connect();

// Cleaning resources on SIGINT
process.on('SIGINT', function() {
    console.log('Disconnecting...');
    zwave.disconnect();
    process.exit();
});
