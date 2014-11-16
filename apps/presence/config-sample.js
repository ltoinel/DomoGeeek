/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the presence application
 * @author: ltoinel@free.fr
 */

var config = {}

// Presence
config.version = '0.1';
config.debug = true;
config.port = 9093;

// The list of devices to check the presence
config.phones = ['ether-1c:XX:XX:XX:XX:XX','ether-60:XX:XX:XX:XX:XX'];

// Force period in hours
config.forceperiod = 4; 

// Multipush API URI
config.multipush = 'http://localhost:9091/multipush';

// Freebox API Access Token
config.freebox = {};
config.freebox.app_token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 
config.freebox.track_id = 'X',

module.exports = config;