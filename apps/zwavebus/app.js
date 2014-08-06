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

// Local require
var config = require('./config');
var handler = require('./handler');
var events = require('./events/index');

// Initialize the Zwave connector
var zwave = new openZwave(config.device, {
    saveconfig: config.saveconfig,
    logging: config.logging, 
    consoleoutput: config.consoleoutput,
    suppressrefresh: config.suppressrefresh
});

// Initialize the node array
var nodes = [];

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
zwave.on('scan complete', handler.onScanComplete);


// Starting 
console.info("Starting DomoGeek Z-WaveBus v%s",config.version);
zwave.connect();

// Cleaning resources on SIGINT
process.on('SIGINT', function() {
    console.log('Disconnecting...');
    zwave.disconnect();
    process.exit();
});
