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

var config = {};

// Group SMS
config.database = 'mongodb://localhost/groupsms';
config.debug = false;
config.port = 9090;

// Admin phone number
config.phone = '+33655668899';
config.name = 'Me';

// SMS Gateway configuration (Android App : eu.apksoft.android.smsgateway)
config.smsgateway = {};
config.smsgateway.url = 'http://myandroidphone:9090/sendsms';

module.exports = config;

