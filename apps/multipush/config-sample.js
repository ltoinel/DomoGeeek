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

var config = {}

// Multipush API
config.version = '0.1';
config.debug = false;
config.port = 9091;

// Mail configuration
config.mail = {};
config.mail.enabled = true;
config.mail.username = "xxxx";
config.mail.password = "";
config.mail.host = "smtp.free.fr";
config.mail.tls = false;
config.mail.ssl = false;
config.mail.from = "xxxx@free.fr";
config.mail.to = "xxxx@free.fr";

// SMS Configuration
config.sms = {};
config.sms.enabled = true;
config.sms.url = 'http://192.168.1.3:9090/sendsms';
config.sms.phone = "0666666666";

// Karotz Alert
config.karotz = {};
config.karotz.enabled = true;
config.karotz.installid = "xxx";
config.karotz.apikey = "xxx";
config.karotz.secret = "xxx";
config.karotz.language = "FR";

//OpenKarotz Alert
config.openkarotz = {};
config.openkarotz.enabled = true;
config.openkarotz.ip = "192.168.1.12"
config.openkarotz.voice = "alice";

module.exports = config;

