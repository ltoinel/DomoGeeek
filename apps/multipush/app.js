/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: MultiPush main app
 * @author: ltoinel@free.fr
 */

// Global require
var express = require('express');

//Local require
var config = require('./config');

// Loading SMS connector
if (config.sms.enabled){
	var sms = require('../../libs/sms');
}

// Loading Mail connector
if (config.mail.enabled){
	var mail = require('../../libs/mail');
}

// Loading OpenKarotz connector
if (config.openkarotz.enabled){
	var openkarotz = require('../../libs/openkarotz');
}

// Init the Express App
var app = express();

/**
 * HTTP GET /multipush
 */
app.get('/multipush',  function (req, resp, next) {
	
    var subject = req.query['subject'];
    var message = req.query['message'];
    
    // By default we send a message to all the canal
    if (req.query['canal'] === undefined){
    	var canal = ['sms','mail','karotz'];
    } else {
    	var canal = req.query['canal'].split(',');
    }
    
    // Send multipush
    multipush(subject, message, canal);
    
    resp.status(201).send();
});


/**
 * Send notification using different bearers.
 * 
 * @param subject The subject of the notification.
 * @param message The content of the message.
 */
function multipush(subject,message, canal){
	
    // We send an SMS
    if (config.sms.enabled && (canal.indexOf("sms") != -1)){
    	sms.send(config.sms, config.sms.phone, message);
    }
    
    // We send an Email
    if (config.mail.enabled && (canal.indexOf("mail") != -1)){
    	mail.send(config.mail, config.mail.from, config.mail.to, "" , subject, message);
    }
    
    // We make the Karotz talking
    if (config.karotz.enabled && (canal.indexOf("karotz") != -1)){
    	karotz.talk(config.karotz, message);
    }
    
    // We make the Openkarotz talking
    if (config.openkarotz.enabled && (canal.indexOf("openkarotz") != -1)){
    	openkarotz.talk(config.openkarotz, message);
    }
}

console.info("Starting DomoGeeek MultiPush v%s",config.version);

// Starting the REST server
app.listen(config.port); 
