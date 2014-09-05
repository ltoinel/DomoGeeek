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
var openkarotz = require('../../../lib/openkarotz');

/**
 *  Garbage can reminder
 */ 
var job = new CronJob('00 00 22 * * 1', function(){

	openkarotz.playsound("saut1");
	openkarotz.talk(config,"Avez-vous pensé à sortir la poubelle bleue ?");
	
  }, function () {
	  console.log('Garbage can reminder');
  },
  false,
  config.timezone 
).start();


/**
 * Recycle garbage can reminder
 */
var job = new CronJob('00 00 22 * * 2', function(){
	
	openkarotz.playsound("saut1");
	openkarotz.talk(config,"Avez-vous pensé à sortir la poubelle jaune ?");
	
  }, function () {
	  console.log('Recycle garbage can reminder');
  },
  false,
  config.timezone 
).start();
