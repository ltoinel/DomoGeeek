/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the Alarm
 * @author: ltoinel@free.fr
 */

var config = {};

// Presence detection
config.alert = {};
config.alert.subject = 'Alerte intrusion';
config.alert.message = 'Une présence anormale a été détectée';

module.exports = config;
