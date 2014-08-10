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

/**
 * Open the shutters
 */ 
var job = new CronJob('00 00 9 * * *', function(){

	if (config.enabled){
		console.log("Opening the shutters");
		request.get('http://192.168.1.4/up');
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
var job = new CronJob('00 30 21 * * *', function(){
	
	if (config.enabled){
		console.log("Closing the shutters");
		request.get('http://192.168.1.4/down');
	};
	
  }, function () {
		if (config.enabled){
			console.log('Shutters are closed');
		};
  },
  false,
  config.timezone 
).start();
