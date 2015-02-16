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

// Debug
config.debug = false;

//Message Broker 
config.mqtt = {};
config.mqtt.uri = "mqtt://192.168.1.2:1883";

module.exports = config;