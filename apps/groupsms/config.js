/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the SMS List
 * @author: ltoinel@free.fr
 */

var config = {}

// Group SMS
config.version = '0.1';
config.debug = false;
config.phone = '+33646340951';
config.name = 'Ludovic Toinel';

// SMS Gateway configuration (Android App : eu.apksoft.android.smsgateway)
config.smsgateway = {};
config.smsgateway.url = 'http://192.168.1.3:9090/sendsms';

module.exports = config;

