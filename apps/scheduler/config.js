/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the Scheduler
 * @author: ltoinel@free.fr
 */

var config = {}

// Scheduler
config.version = '0.1';
config.debug = true;
config.timezone = 'Europe/Paris';
config.port = 9092;
config.multipush = 'http://localhost:9091/multipush';

// Shutters task service
config.shutters = {};
config.shutters.enabled = true;
config.shutters.latitude = 47.2;
config.shutters.longitude = -1.5; 
config.shutters.open = {};
config.shutters.open.time = '0 0 10 * * *';
config.shutters.open.message = 'Ouverture automatique des volets';
config.shutters.open.url = 'http://192.168.1.4/up';
config.shutters.close = {};
//config.shutters.open.time = '0 0 10 * * *';
config.shutters.close.message = 'Fermeture automatique des volets';
config.shutters.close.url =  'http://192.168.1.4/down';

// Openkarotz task service
config.openkarotz = {};
config.openkarotz.enabled = true;
config.openkarotz.ip = '192.168.1.6';
config.openkarotz.wakeup = '00 45 7 * * *';
config.openkarotz.sleep = '00 30 23 * * *';

// Reminder task service
config.reminder1 = {};
config.reminder1.time = "0 0 22 * * 1";
config.reminder1.message = "Avez-vous pensé à sortir la poubelle bleue ?";
config.reminder2 = {};
config.reminder2.time = "0 0 22 * * 2";
config.reminder2.message = "Avez-vous pensé à sortir la poubelle jaune ?";

module.exports = config;

