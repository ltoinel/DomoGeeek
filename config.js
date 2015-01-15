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

config.port = {};
config.port.http = 8080;
config.port.coap = 3000;
config.port.mqtt = 3001;

config.broker = {};
config.broker.persistence = 'mongodb://localhost/domogeeek';

module.exports = config;