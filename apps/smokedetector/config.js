/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the smoke detector alarm.
 * @author: ltoinel@free.fr
 */

var config = {};

// Smoke detection
config.alert = {};
config.alert.subject = 'Alerte Incendie';
config.alert.message = 'De la fumée et de fortes températures ont été détectés à votre domicile';

config.cancel = {};
config.cancel.subject = 'Alerte Incendie terminée';
config.cancel.message = 'Le détecteur de fumée ne détecte plus de fumée';

module.exports = config;
