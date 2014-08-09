/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Karotz Connector
 * @author: ltoinel@free.fr
 */

var karotz  = require('karotz');

/**
 * Make the karotz talk
 */
exports.talk = function(config, message) {
	
	console.info("Make the Karotz talking");
	 
    // Authentication
	karotz.authentication(config.apikey, config.installid, config.secret, false, function(app){
	    
	    // The Karotz is connected
	    if (app.status == "connected"){
	    
		    karotz.tts('speak', 'FR', message, function(msg) {
		        console.log(msg); //Output 'Speaking' or 'Error'
		    });
		    
	    } else {
	    	console.log("Karotz is disconnected");
	    }
	
	});

};