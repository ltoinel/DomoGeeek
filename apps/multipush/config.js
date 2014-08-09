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

// Mail configuration
config.mail = {};
config.mail.enabled = true;
config.mail.username = "ltoinel";
config.mail.password = "";
config.mail.host = "smtp.free.fr";
config.mail.tls = false;
config.mail.ssl = false;
config.mail.from = "ltoinel@free.fr";
config.mail.to = "ltoinel@free.fr";

// SMS Configuration
config.sms = {};
config.sms.enabled = true;
config.sms.url = 'http://192.168.1.3:9090/sendsms';
config.sms.phone = "0646340951";

// Karotz Alert
config.karotz = {};
config.karotz.enabled = true;
config.karotz.installid = "0c21be47-30cd-48c2-9bed-8ec191b71205";
config.karotz.apikey = "eae6399f-47cf-4199-9fb2-96b612f15521";
config.karotz.secret = "8d3b3d3c-5f04-4e63-8ed9-a6f77769c1b2";
config.karotz.language = "FR";

module.exports = config;

