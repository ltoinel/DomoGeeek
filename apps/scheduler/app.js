/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Scheduler main app
 * @author: ltoinel@free.fr
 */

// Global require
var express = require('express');

// Local require
var config = require('./config');

// Init the Express App
var app = express();

/**
 * HTTP PUT /scheduler
 */
app.put('/scheduler/:status',  function (req, resp, next) {
	
	if (req.params.status === "on"){
		console.log("Scheduler is enabled");
		config.enabled = true;
	} else if (req.params.status === "off"){
		console.log("Scheduler is disabled");
		config.enabled = false;
	} else {
		resp.status(400).send();
	}
	
	resp.status(204).send();
});


/**
 * HTTP GET /scheduler
 */
app.get('/scheduler',  function (req, resp, next) {
	
	resp.send(200, {enabled: config.enabled});
	
});


// Starting 
console.info("Starting DomoGeek Scheduler v%s",config.version);

// Loading tasks 
var tasks = require('./tasks/index');

// Starting the REST server
app.listen(config.port); 