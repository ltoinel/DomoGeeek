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

var config = {};

// Zwavebus
config.debug = false;
config.modpath = '/home/pi/domogeeek/deps/node-openzwave/lib';
config.saveconfig = false;
config.logging =  false; 
config.consoleoutput = false;
config.suppressrefresh = false;
config.device = '/dev/ttyUSB0';
config.broker = 'mqtt://localhost:3001';

module.exports = config;

