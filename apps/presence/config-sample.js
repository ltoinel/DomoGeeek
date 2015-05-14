/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the presence application
 * @author: ltoinel@free.fr
 */

var config = {};

// The list of devices to check the presence
// If one of these devices are present, there is a presence.
config.phones = ['ether-1c:XX:XX:XX:XX:XX','ether-60:XX:XX:XX:XX:XX'];

// Force presence period in minutes
config.forceperiod = 20; 

// Last device active time in minutes
config.lastactivetime = 15; 

//The hours we force the presence value
config.forcepresence = [];
config.forcepresence[0] = [10,14]; // Sunday 10h to 14h
config.forcepresence[1] = []; // Monday
config.forcepresence[2] = []; // Tuesday
config.forcepresence[3] = []; // Wednesday
config.forcepresence[4] = []; // Thursday
config.forcepresence[5] = []; // Friday
config.forcepresence[6] = []; // Saturday

//Multipush message
config.message = {};
config.message.activated = "Présence activée pour une durée de {0} minutes";
config.message.unactivated = "Présence désactivée";

module.exports = config;