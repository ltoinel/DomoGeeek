/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the MultiPush
 * @author: ltoinel@free.fr
 */

var config = {};

// Multipush API
config.debug = false;

// Mail configuration
config.mail = {};
config.mail.enabled = true;
config.mail.username = "xxxx";
config.mail.password = "";
config.mail.host = "smtp.free.fr";
config.mail.tls = false;
config.mail.ssl = false;
config.mail.from = "xxxx@free.fr";
config.mail.to = ["xxxx@free.fr"];

// SMS Gateway Configuration
config.sms = {};
config.sms.enabled = true;
config.sms.url = 'http://android-phone:9090/sendsms';
config.sms.phone = ["0666666666","0677777777"];

// OpenKarotz Configuration
config.openkarotz = {};
config.openkarotz.enabled = true;
config.openkarotz.ip = "192.168.1.12";
config.openkarotz.voice = "alice";

module.exports = config;

