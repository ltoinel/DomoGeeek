/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the ZwaveBus
 * @author: ltoinel@free.fr
 */

var config = {};

// Zwavebus
config.port = 9094;
config.database = 'mongodb://localhost/zwavebus';
config.debug = false;
config.modpath = '/home/pi/domogeeek/deps/node-openzwave/lib';
config.saveconfig = false;
config.logging =  false; 
config.consoleoutput = false;
config.suppressrefresh = false;
config.device = '/dev/ttyUSB0';
config.multipush = 'http://localhost:9091/multipush';
config.presence = 'http://localhost:9093/presence';

// OpenKarotz 
config.openkarotz = {};
config.openkarotz.ip = "192.168.1.6";
config.openkarotz.voice = "alice";

// Power analysis
config.power = {};
config.power.max = 12000;
config.power.voice = 8000;
config.power.message.warning = "Attention, la maison consomme {0} Watt";

// Presence detection
config.presence.alert.subject = 'Alerte intrusion';
config.presence.alert.message = 'Une présence anormale a été détectée';

// Smoke detection
config.smoke.alert.subject = 'Alerte Incendie';
config.smoke.alert.message = 'De la fumée et de fortes températures ont été détectés à votre domicile';
config.smoke.cancel.subject = 'Alerte Incendie terminée';
config.smoke.cancel.message = 'Le détecteur de fumée ne détecte plus de fumée';

module.exports = config;

