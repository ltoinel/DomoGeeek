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
 * Makes the Openkarotz talk.
 * 
 * @param config : the OpenKarotz configuration.
 * @param message : the message to say.
 */
exports.talk = function(config, message, callback) {
	
	console.info("Sending a message to the Openarotz TTS");
	
	var karotz = new openkarotz(config.ip);
	
	karotz.tts(message, config.voice, true, function(msg) {
        console.log(msg); 
        if (callback != undefined){
        	callback();
        }
    });
};

/**
 * Plays sound.
 * 
 * @param config : the OpenKarotz configuration.
 * @param sound : the sound filename to play.
 */
exports.playsound = function(config, sound){
	
	var karotz = new openkarotz(config.ip);
	
	karotz.sound_control(sound, function(msg) {
        console.log(msg); 
    });
};


/**
 * Change LED color.
 * 
 * @param config : the OpenKarotz configuration.
 * @param color : the color to display.
 */
exports.led = function(config, color){
	
	var karotz = new openkarotz(config.ip);
	
	karotz.led(
		    'light',
		    {
		        color : color, //hexa RGB color
		    },
		    function(msg) {
		    	console.log(msg);
		    }
		);
}

/**
 * Helps the OpenKarotz to sleep.
 * 
 * @param config : the OpenKarotz configuration.
 */
exports.sleep = function(config) {
	
	console.info("Make the Openarotz sleeping");
	 
	var karotz = new openkarotz(config.ip);

	karotz.sleep(function(msg) {
        console.log(msg); 
    });
};

/**
 * Wakeup the Openkarotz.
 * 
 * @param config : the OpenKarotz configuration.
 */
exports.wakeup = function(config) {
	
	console.info("Wakeup the Openarotz ");
	 
	var karotz = new openkarotz(config.ip);

	karotz.wakeup(true, function(msg) {
        console.log(msg); 
    });
};