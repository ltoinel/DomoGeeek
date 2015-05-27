/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Scheduler main app
 * @author: ltoinel@free.fr
 */

// Local require
var module = require("../../libs/module");

global.scheduler = new module( __dirname);
global.scheduler.start();

// Loading the available tasks 
var tasks = require('./tasks/index');

