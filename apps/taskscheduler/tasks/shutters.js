/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Task that opens and closes my shutters
 * @author: ltoinel@free.fr
 */

var request = require('request');
var CronJob = require('cron').CronJob;
var SunCalc = require('suncalc');
	
//Local require
var config = require('../config');
var multipush = require('../../../libs/multipush');

/**
 * Initializes a new Cron job.
 * 
 * @param name : the job name
 * @param uri : the uri to request
 * @param timeFunction : the time function to call
 * @param date : the date 
 */ 
function initJob(name, uri, timeFunction, date){
	
	var time = timeFunction(date);
	console.log("Job initializing : " + name + " at " + time);
	
	var job = new CronJob(time,
	
	// OnTick
	function(){
		
		console.log("Job starting : " + name);
		
		request.get(uri).on('error', function(err) {
			console.error("Shutter API error : " + err);
		});
		
		multipush.send(config.multipush,"Job starting",name,config.shutters.channel);
		
		// Stop the current job
		this.stop();
		
	// OnCompleted
	},function(){
		
		console.log("Job stop : " + name);
		
		// Schedule the next job
		scheduleNextJob(name);

	}, false, config.timezone).start();
}

/**
 * Schedules the next jobs.
 * 
 * @param previousJobName The previous job name
 */
function scheduleNextJob(previousJobName){
	
	// If the previous job was closing the shutters
	if (previousJobName == config.shutters.close.message) {
		
		// Schedules the task that will open the shutters tomorrow
		initJob(config.shutters.open.message, config.shutters.open.url, getOpenTime, getTomorrowDate());

	// If the previous job was opening the shutters
	} else if (previousJobName == config.shutters.open.message){
		
		// Schedules the task that will close the shutters today
		initJob(config.shutters.close.message, config.shutters.close.url, getCloseTime, new Date());
	}
}

/**
 * Return the date of tomorrow.
 */ 
function getTomorrowDate(){
	var today = new Date();
	var tomorrow = new Date();
	tomorrow.setDate(today.getDate()+1);
	return tomorrow;
}

/**
 * Return the times regarding the configured latitude and longitude.
 * 
 * @param date : the date to use for the times calculation.
 */ 
function getTimes(date){
	var times = SunCalc.getTimes(date, config.shutters.latitude, config.shutters.longitude);
	return times;
}

/**
 * Return the next time in cron format to open the shutters.
 * 
 * @param date : the date to use for the sunrise calculation.
 */ 
function getOpenTime(date){

	// Fix configured time
	if (config.shutters.open.time !== undefined){
		return config.shutters.open.time;
	}
	
	var times = getTimes(date);
	console.log("Get sunrise time for " + date + " => " + times.sunrise);
	
	return times.sunrise.getSeconds()+" "+times.sunrise.getMinutes()+" "+times.sunrise.getHours()+" * * *";
}

/**
 * Return the next time in cron format to close the shutters.
 * 
 * @param date : the date to use for the sunset calculation.
 */ 
function getCloseTime(date){
	
	// Fix configured time
	if (config.shutters.close.time !== undefined){
		return config.shutters.close.time;
	}
	
	var times = getTimes(date);
	console.log("Get sunset time for " + date + " => " + times.sunset);
	
	return times.sunset.getSeconds()+" "+times.sunset.getMinutes()+" "+times.sunset.getHours()+" * * *";
}

// Starts the right job now
var now = new Date();
var times = getTimes(now);

// Sunrise will arrive today, we have to open the shutters today
if (times.surise > now){
	initJob(config.shutters.open.message, config.shutters.open.url, getOpenTime, new Date());
}
// Sunrise was previous, sunset will arrive today, we have to close the shutters today
else if (times.sunset > now ){
	initJob(config.shutters.close.message, config.shutters.close.url, getCloseTime, new Date());
	
// Sunrise and sunset are past, we have to open the shutters tomorrow
} else if (times.sunset < now ){
	initJob(config.shutters.open.message, config.shutters.open.url, getOpenTime, getTomorrowDate());
}
	



