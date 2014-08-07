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
var sms = require('../../lib/sms');
var mail = require('../../lib/mail');

// Init the Express App
var app = express();

/**
 * HTTP GET /multipush
 */
app.get('/multipush',  function (req, resp, next) {
	
    var subject = req.query['subject'];
    var message = req.query['message'];
    
    // We send a mail
    if (config.mail.enabled){
    	sms.send(config, phone, message);
    }
    
    // We send an sms
    if (config.sms.enabled){
    	mail.send(config.mail, config.mail.from, config.mail.to, "" , subject, message);
    }
});


console.info("Starting DomoGeek MultiPush v%s",config.version);

app.listen(9091); //to port on which the express server listen
