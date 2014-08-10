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

//Local require
var config = require('./config');

//Init the Express App
var app = express();

/**
 * HTTP GET /multipush
 */
app.get('/scheduler',  function (req, resp, next) {
	resp.status(200).send();
});

// Starting 
console.info("Starting DomoGeek Scheduler v%s",config.version);

// Loading tasks 
var tasks = require('./tasks/index');

// Starting the REST server
app.listen(config.port); 