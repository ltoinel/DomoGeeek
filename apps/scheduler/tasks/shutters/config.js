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

//Timezone
config.timezone = 'Europe/Paris';

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
config.shutters.channel =  'openkarotz';