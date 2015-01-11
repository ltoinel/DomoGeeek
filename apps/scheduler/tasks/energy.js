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

var energy = null;

/**
 *  Garbage can reminder
 */ 
var energy = new CronJob(config.energy.time, function(){
	
	// Configure the request to the multipush service
    var options = {
       url: config.energy.url,
       method: 'GET'
    } 
    
    // Sending the request
    request(options, function (error, response, body) {
       if (!error && response.statusCode == 200) {
    	   if (energy != null){
    		   // How much energy the house consumes
    		   var consume = response.energy - energy;
    		   multipush.send(config.multipush,"Reminder1","La maison a consommé " + consume + " watt aujourd'hui !","openkarotz");
    	   }
    	   // Save the new value
    	   energy = response.energy;
       } else {
       		console.error('Energy Request error : %s', error);
       }
    });
    
	
  },
  undefined,
  false,
  config.timezone 
).start();



