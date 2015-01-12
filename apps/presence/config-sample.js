/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the presence application
 * @author: ltoinel@free.fr
 */

var config = {};

// Presence
config.debug = true;
config.port = 9093;

//Multipush API URI
config.multipush = 'http://localhost:9091/multipush';

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

// Freebox API Access Token
config.freebox = {};
config.freebox.app_token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
config.freebox.track_id = 'X';

//Multipush message
config.voice.activated = "Présence activée pour une durée de {0} minutes";
config.voice.unactivated = "Présence désactivée";

module.exports = config;