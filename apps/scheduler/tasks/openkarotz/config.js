/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the OpenKarotz task
 * @author: ltoinel@free.fr
 */

var config = {};

//Timezone
config.timezone = 'Europe/Paris';

//Openkarotz task service
config.openkarotz = {};
config.openkarotz.enabled = true;
config.openkarotz.ip = '192.168.1.6';
config.openkarotz.wakeup = '0 45 7 * * *';
config.openkarotz.sleep = '0 30 23 * * *';
config.openkarotz.goodnight = 'Bonne nuit les amis !';
config.openkarotz.voice = "alice";

module.exports = config;