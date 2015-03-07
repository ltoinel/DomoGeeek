/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the KarotzPowerAlert
 * @author: ltoinel@free.fr
 */

var config = {};

// Power analysis
config.max = 12000; // Kwh

// Alert message
config.alert = {};
config.alert.level = 8000; // Kwh
config.alert.message = "Attention, la maison consomme {0} Watt";

//OpenKarotz Configuration
config.openkarotz = {};
config.openkarotz.enabled = true;
config.openkarotz.ip = "192.168.1.6";
config.openkarotz.voice = "alice";

module.exports = config;

