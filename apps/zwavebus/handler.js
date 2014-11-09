/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the ZwaveBus
 * @author: ltoinel@free.fr
 */

// Local require
var bus = require( './bus' );

// Model
var Event = require('./models/event');

// Initialize the node array
var nodes = [];

/*
 * When the driver is ready.
 * @param homeid: the home id.
 */
exports.onDriverReady = function (homeid) {
    console.log('scanning homeid=0x%s...', homeid.toString(16));
};

/*
 * When the driver failed to start.
 */
exports.onDriverFailed = function() {
    console.log('failed to start driver');
    zwave.disconnect();
    process.exit();
}

/*
 * When a node is discovered and added.
 */
exports.onNodeAdded = function(nodeid) {
	    nodes[nodeid] = {
	        manufacturer: '',
	        manufacturerid: '',
	        product: '',
	        producttype: '',
	        productid: '',
	        type: '',
	        name: '',
	        loc: '',
	        classes: {},
	        ready: false,
	    };
}

/*
 * When a new value is added.
 */
exports.onValueAdded = function (nodeid, comclass, value) {
    if (!nodes[nodeid]['classes'][comclass]){
        nodes[nodeid]['classes'][comclass] = {};
    }
    nodes[nodeid]['classes'][comclass][value.index] = value;
    
	console.log('node%d: value added: %d:%s:%s',  nodeid, comclass, value['label'], value['value']);
}

/*
 * When a value changed.
 */
exports.onValueChanged = function (nodeid, comclass, value) {
	
	// Saving the event
	new Event({ nodeid: nodeid,
	    comclass: comclass,
	    type: value['type'],
	    label: value['label'],
	    value: value['value']}).save();
	
	// Broadcast the event with the comclass
	bus.emit(comclass ,nodeid, value);
	
    if (nodes[nodeid]['ready']) {
        console.log('node%d: value changed: %d:%s:%s->%s', nodeid, comclass,
                value['label'],
                nodes[nodeid]['classes'][comclass][value.index]['value'],
                value['value']);
    } else {
    	console.log('node%d: value changed: %d:%s:%s',  nodeid, comclass, value['label'], value['value']);
    }
    
    nodes[nodeid]['classes'][comclass][value.index] = value;
}

/*
 * When a value is removed.
 */
exports.onValueRemoved = function (nodeid, comclass, index) {
    if (nodes[nodeid]['classes'][comclass] &&
        nodes[nodeid]['classes'][comclass][index])
        delete nodes[nodeid]['classes'][comclass][index];
}

/* 
 * When a node is ready.
 */
exports.onNodeReady = function (nodeid, nodeinfo) {
    nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
    nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
    nodes[nodeid]['product'] = nodeinfo.product;
    nodes[nodeid]['producttype'] = nodeinfo.producttype;
    nodes[nodeid]['productid'] = nodeinfo.productid;
    nodes[nodeid]['type'] = nodeinfo.type;
    nodes[nodeid]['name'] = nodeinfo.name;
    nodes[nodeid]['loc'] = nodeinfo.loc;
    nodes[nodeid]['ready'] = true;
    console.log('node%d: %s, %s', nodeid,
            nodeinfo.manufacturer ? nodeinfo.manufacturer
                      : 'id=' + nodeinfo.manufacturerid,
            nodeinfo.product ? nodeinfo.product
                     : 'product=' + nodeinfo.productid +
                       ', type=' + nodeinfo.producttype);
    console.log('node%d: name="%s", type="%s", location="%s"', nodeid,
            nodeinfo.name,
            nodeinfo.type,
            nodeinfo.loc);
    for (comclass in nodes[nodeid]['classes']) {
        switch (comclass) {
        case 0x25: // COMMAND_CLASS_SWITCH_BINARY
        case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
            zwave.enablePoll(nodeid, comclass);
            break;
        }
        var values = nodes[nodeid]['classes'][comclass];
        console.log('node%d: class %d', nodeid, comclass);
        for (idx in values)
            console.log('node%d:   %s=%s', nodeid, values[idx]['label'], values[idx]['value']);
    }
}

/*
 * When a notification is received.
 */
exports.onNotification = function (nodeid, notif) {
    switch (notif) {
    case 0:
        console.log('node%d: message complete', nodeid);
        break;
    case 1:
        console.log('node%d: timeout', nodeid);
        break;
    case 2:
        console.log('node%d: nop', nodeid);
        break;
    case 3:
        console.log('node%d: node awake', nodeid);
        break;
    case 4:
        console.log('node%d: node sleep', nodeid);
        break;
    case 5:
        console.log('node%d: node dead', nodeid);
        break;
    case 6:
        console.log('node%d: node alive', nodeid);
        break;
        }
}

/*
 * When the network scan is complete.
 */
exports.onScanComplete = function () {
    console.log('scan complete, hit ^C to finish.');
}