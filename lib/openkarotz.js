/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Openkarotz Connector
 * @author: ltoinel@free.fr
 */

var openkarotz = require('openkarotz');


/**
 * Make the Openkarotz talk
 */
exports.talk = function(config, message) {
	
	console.info("Make the Openarotz talking");
	
	var karotz = new openkarotz(config.ip);
	
	karotz.tts(message, config.voice, true, function(msg) {
        console.log(msg); 
    });
};

/**
 * Help the Openarotz to sleep
 */
exports.sleep = function(config) {
	
	console.info("Help the Openarotz to sleep");
	 
	var karotz = new openkarotz(config.ip);

	karotz.sleep(function(msg) {
        console.log(msg); 
    });
};

/**
 * Wakeup the Openkarotz
 */
exports.wakeup = function(config) {
	
	console.info("Wakeup the Openarotz ");
	 
	var karotz = new openkarotz(config.ip);

	karotz.wakeup(true, function(msg) {
        console.log(msg); 
    });
};