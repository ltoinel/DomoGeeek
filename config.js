/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the MultiPush
 * @author: ltoinel@free.fr
 */

var config = {};

// Message Broker 
config.debug = false;
config.port = 1883;
config.database = 'mongodb://localhost/mqtt';

module.exports = config;