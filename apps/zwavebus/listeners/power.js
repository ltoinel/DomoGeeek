/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Presence module for the Aenon Lab Multisensor.
 * @author: ltoinel@free.fr
 */
 
// Local require
var bus = require( '../bus' );
var config = require('./../config');

//Model
var Event = require('../models/event');

// The command to listen
var COMMAND_CLASS_METER = 50;

/**
 * We listen for a COMMAND_CLASS_METER event.
 * This event is sent by the Aeon HEM2 power energy meter
 */
bus.on(COMMAND_CLASS_METER, function(nodeid, value){

	if (nodeid == 7 && value['label'] == "Power"){
		console.log("Saving the power value : " + value['value']);
		
		// Saving the event
		new Event({ nodeid: nodeid,
		    comclass: comclass,
		    type: value['type'],
		    label: value['label'],
		    value: value['value']}).save();
	} else {
		//console.log(JSON.stringify(value));
	}
});
