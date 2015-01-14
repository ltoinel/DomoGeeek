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

var config = {};

// Scheduler
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
config.shutters.open.time = '0 0 10 * * *'; // If not set, use the sunset time
config.shutters.open.message = 'Ouverture automatique des volets';
config.shutters.open.url = 'http://xxx.xxx.xxx.xxx/up';
config.shutters.close = {};
//config.shutters.close.time = '0 0 22 * * *'; // If not set, use the sunrise time
config.shutters.close.message = 'Fermeture automatique des volets';
config.shutters.close.url =  'http://xxx.xxx.xxx.xxx/down';
config.shutters.channel =  'openkarotz';

// Openkarotz task service
config.openkarotz = {};
config.openkarotz.enabled = true;
config.openkarotz.ip = 'xxx.xxx.xxx.xxx';
config.openkarotz.wakeup = '0 0 8 * * *';
config.openkarotz.sleep = '0 0 23 * * *';
config.openkarotz.goodnight = 'Bonne nuit les amis !';

// Reminder task service
config.reminder = [];
config.reminder[0] = {};
config.reminder[0].time = '0 0 22 * * 1'; // Lundi soir
config.reminder[0].message = 'Avez-vous pensé à sortir la poubelle bleue ?';
config.reminder[0].channel = 'openkarotz';
config.reminder[1] = {};
config.reminder[1].time = '0 0 22 * * 2'; // Mardi soir
config.reminder[1].message = 'Avez-vous pensé à sortir la poubelle jaune ?';
config.reminder[1].channel = 'openkarotz';


//Power consumption information
config.energy = {};
config.energy.time = '0 0 20 * * *';
config.energy.url = 'http://192.168.1.2:9094/context';
config.energy.message.today = 'La maison a consommé {0} kilowatt aujourd\'hui !';

module.exports = config;

