/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the reminder task
 * @author: ltoinel@free.fr
 */

var config = {};

// Timezone
config.timezone = 'Europe/Paris';


config.reminder = [];

//Reminder n°1
config.reminder[0] = {};
config.reminder[0].time = '0 0 22 * * 1'; // Lundi soir
config.reminder[0].message = 'Avez-vous pensé à sortir la poubelle bleue ?';
config.reminder[0].channel =  ["openkarotz"];

//Reminder n°2
config.reminder[1] = {};
config.reminder[1].time = '0 0 22 * * 2'; // Mardi soir
config.reminder[1].message = 'Avez-vous pensé à sortir la poubelle jaune ?';
config.reminder[1].channel =  ["openkarotz"];

module.exports = config;