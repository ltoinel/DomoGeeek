/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the Energy task
 * @author: ltoinel@free.fr
 */

var config = {};

//Timezone
config.timezone = 'Europe/Paris';

//Power consumption information
config.energy = {};
config.energy.time = '0 0 20 * * *';
config.energy.url = 'http://192.168.1.2:9094/context';
config.energy.message.today = 'La maison a consommé {0} kilowatt aujourd\'hui !';