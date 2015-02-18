/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Task that make sleep and wake up the OpenKarotz
 * @author: ltoinel@free.fr
 */

var CronJob = require('cron').CronJob;

// Local require
var config = require('./config');
var openkarotz = require('../../libs/openkarotz');

/**
 * Wakeup the karotz
 */
var job = new CronJob(config.openkarotz.wakeup, function() {

	if (config.openkarotz.enabled) {
		openkarotz.wakeup(config.openkarotz);
	}

}, function() {
	console.log('Karotz is waking up');
}, false, config.timezone).start();

/**
 * Make the karotz sleep
 */
var job = new CronJob(config.openkarotz.sleep, function() {

	if (config.openkarotz.enabled) {
		openkarotz.talk(config.openkarotz, config.openkarotz.goodnight,
				function() {
					openkarotz.sleep(config.openkarotz);
				});
	}

}, function() {
	console.log('Karotz is sleeping');
}, false, config.timezone).start();
