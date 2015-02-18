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

config.alert = {};
config.alert.level = 8000; // Kwh
config.alert.message = "Attention, la maison consomme {0} Watt";

module.exports = config;
