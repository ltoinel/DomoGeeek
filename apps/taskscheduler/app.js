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

// Local require
var config = require('./config');
var pjson = require('./package.json');

// Starting 
console.info("Starting DomoGeeek %s v%s",pjson.name, pjson.version);

// Loading tasks 
var tasks = require('./tasks/index');
