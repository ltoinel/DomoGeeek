/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Task that remind message during the day
 * @author: ltoinel@free.fr
 */

var CronJob = require('cron').CronJob;

// Local require
var config = require('./config');

// For each reminders
config.reminder.forEach(function(reminder) {
	var reminderJob = new CronJob(reminder.time, function() {
		
		// Create message
		var message = {};
		message.subject = "Reminder";
		message.content = reminder.message;
		message.canal = reminder.channel;

		// Publishing a message
		global.client.publish('multipush', JSON.stringify(message));
		
	}, undefined, false, config.timezone).start();
});
