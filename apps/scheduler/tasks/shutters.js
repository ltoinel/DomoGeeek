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

// Local config
config.close = {};
config.close.hour = '00 30 21 * * *';
config.close.url =  'http://192.168.1.4/down';
config.open = {};
config.open.hour = '00 00 9 * * *';
config.open.url = 'http://192.168.1.4/up';

/**
 * Open the shutters
 */ 
var job = new CronJob(config.open.hour, function(){

	if (config.enabled){
		console.log("Opening the shutters");
		request.get(config.open.url);
	};
	
  }, function () {
	  
		if (config.enabled){
			console.log('Shutters are open');
		};
  },
  false,
  config.timezone 
).start();


/**
 * Close the shutters
 */
var job = new CronJob(config.close.hour, function(){
	
	if (config.enabled){
		console.log("Closing the shutters");
		request.get(config.close.url);
	};
	
  }, function () {
		if (config.enabled){
			console.log('Shutters are closed');
		};
  },
  false,
  config.timezone 
).start();
