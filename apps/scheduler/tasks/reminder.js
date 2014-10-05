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
var job1 = new CronJob('0 0 22 * * 1', function(){
	
	multipush("Avez-vous pensé à sortir la poubelle bleue ?")
	
  }, function () {
	  console.log('Garbage can reminder');
  },
  false,
  config.timezone 
).start();


/**
 * Recycle garbage can reminder
 */
var job2 = new CronJob('0 0 22 * * 2', function(){
	
	multipush("Avez-vous pensé à sortir la poubelle jaune ?");
	
  }, function () {
	  console.log('Recycle garbage can reminder');
  },
  false,
  config.timezone 
).start();


/**
 * multipush
 */
var multipush = function(message){
	
	// Request
	var request = require('request');
	
	// Configure the request to the multipush service
    var options = {
       url: config.multipush,
       method: 'GET',
       qs: {'subject': 'Reminder', 'message': message, 'canal': 'openkarotz'}
    } 
    
    // Sending the request
    request(options, function (error, response, body) {
       if (!error && response.statusCode == 201) {
       		console.info('Reminder sent');
       } else {
       		console.error('Reminder error : %s', error);
       }
    });
}
