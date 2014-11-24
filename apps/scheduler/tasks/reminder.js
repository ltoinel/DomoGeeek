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

var request = require('request');
var CronJob = require('cron').CronJob;
	
//Local require
var config = require('../config');
var multipush = require('../../../libs/multipush');

/**
 *  Garbage can reminder
 */ 
var job1 = new CronJob(config.reminder1.time, function(){
	multipush.send(config.multipush,"Reminder1",config.reminder1.message,"openkarotz");
  },
  undefined,
  false,
  config.timezone 
).start();


/**
 * Recycle garbage can reminder
 */
var job2 = new CronJob(config.reminder2.time, function(){
	multipush.send(config.multipush,"Reminder2",config.reminder2.message,"openkarotz");
  }, 
  undefined,
  false,
  config.timezone 
).start();



