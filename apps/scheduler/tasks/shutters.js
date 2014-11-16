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
var SunCalc = require('suncalc');
	
//Local require
var config = require('../config');

// Local config
config.shutters = {};
config.shutters.enabled = true;
config.shutters.latitude = 47.2;
config.shutters.longitude = -1.5; 

// Close
config.shutters.url = {};
config.shutters.url.close =  'http://192.168.1.4/xdown';
config.shutters.url.open = 'http://192.168.1.4/xup';


// Initialize a new job
function initJob(name, uri, timeFunction, date){
	var time = timeFunction(date);
	console.log("Job initializing : " + name + " at " + time);
	var job = new CronJob(time,function(){
		
		console.log("Job starting : " + name);
		request.get(uri);
		
	},function(){
		
		console.log("Job completed : " + name);
		
		// Start the next job
		initJob(name, uri, timeFunction, getTomorrowDate());
		
		// Stop the current job
		this.stop();
		
	}, false, config.timezone).start();
}

// Return the date of tomorrow
function getTomorrowDate(){
	var today = new Date();
	var tomorrow = new Date();
	tomorrow.setDate(today.getDate()+1);
	return tomorrow;
}

// Return the sunrise time for the date in cron format
var getSunriseTime = function(date){
	
	
	var times = SunCalc.getTimes(date, config.shutters.latitude, config.shutters.longitude);
	console.log("Get sunrise time for " + date + " => " + times.sunriseEnd);
	
	if (new Date() > times.sunriseEnd){ 
		console.log("Deprecated Sunrise time, using tomorow time");
		times = SunCalc.getTimes(getTomorrowDate(), config.shutters.latitude, config.shutters.longitude);
	}
	
	//return times.sunriseEnd.getSeconds() +" "+times.sunriseEnd.getMinutes()+" "+times.sunriseEnd.getHours()+" * * *";
	return "0 31 23 * * *";
}

// Return the sunset time for the date in cron format
var getSunsetTime = function(date){
	
	var times = SunCalc.getTimes(date, config.shutters.latitude, config.shutters.longitude);
	console.log("Get sunset time for " + date + " => " + times.sunset);
	
	if (new Date() > times.sunset){ 
		console.log("Deprecated Sunset time, using tomorow time");
		times = SunCalc.getTimes(getTomorrowDate(), config.shutters.latitude, config.shutters.longitude);
	}
	return times.sunset.getSeconds() +" "+times.sunset.getMinutes()+" "+times.sunset.getHours()+" * * *";
}

// Initialize
initJob("Ouverture automatique des volets", config.shutters.url.open, getSunriseTime, new Date());
initJob("Fermeture automatique des volets", config.shutters.url.close, getSunsetTime, new Date());

