/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the presence
 * @author: ltoinel@free.fr
 */

var config = {}

// Scheduler
config.version = '0.1';
config.debug = true;
config.phones = ['ether-1c:1a:c0:1f:c0:b1','ether-60:fa:cd:84:7d:d8'];
config.port = 9093;
config.multipush = 'http://localhost:9091/multipush';

module.exports = config;

