/**
 * DomoGeeek v1.0
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
config.energy.message = 'La maison a consommé {0} kilowatt aujourd\'hui !';

module.exports = config;