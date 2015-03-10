/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Task that make sleep and wake up the OpenKarotz
 * @author: ltoinel@free.fr
 */

// Global Require
var openkarotz = require('openkarotz');
var CronJob = require('cron').CronJob;

// Local require
var config = require('./config');


/**
 * Wakeup the karotz
 */
var job = new CronJob(config.openkarotz.wakeup, function() {

	if (config.openkarotz.enabled) {
		
		var karotz = new openkarotz(config.openkarotz.ip);
		
		karotz.wakeup(true, function(msg) {
			console.log(msg);
		});
	}

}, function() {
	console.log('Karotz is waking up');
}, false, config.timezone).start();

/**
 * Make the karotz sleep
 */
var job = new CronJob(config.openkarotz.sleep, function() {

	if (config.openkarotz.enabled) {
		
		var karotz = new openkarotz(config.openkarotz.ip);
		
		karotz.tts(config.openkarotz.goodnight, config.openkarotz.voice, true, function(msg) {
	
			karotz.sleep(function(msg) {
				console.log(msg);
			});
		});
	}

}, function() {
	console.log('Karotz is sleeping');
}, false, config.timezone).start();
