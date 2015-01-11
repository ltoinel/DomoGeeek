/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Task that open and close my shutters
 * @author: ltoinel@free.fr
 */

var CronJob = require('cron').CronJob;
	
//Local require
var config = require('../config');
var multipush = require('../../../libs/multipush');

// For each reminders
config.reminder.forEach(function(reminder) {
	var reminder1 = new CronJob(reminder.time, function(){
		multipush.send(config.multipush,"Reminder",reminder.message,reminder.channel);
	  },
	  undefined,
	  false,
	  config.timezone 
	).start();
});


