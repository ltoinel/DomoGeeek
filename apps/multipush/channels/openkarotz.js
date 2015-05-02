/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Openkarotz Connector
 * @author: ltoinel@free.fr
 */

var openkarotz = require('openkarotz');

// Unique instance of OpenKarotz
var karotzInstance = null;

/**
 * Return an OpenKarotz instance.
 * 
 * @param ip
 *            of the OpenKarotz to connect with
 * @returns an instance of OpenKarotz
 */
function getOpenKarotz(ip) {
	if (karotzInstance === null) {
		karotzInstance = new openkarotz(ip);
	}
	return karotzInstance;
}

/**
 * Makes the Openkarotz talk.
 * 
 * @param config :
 *            the OpenKarotz configuration.
 * @param message :
 *            the message to say.
 */
exports.talk = function(config, message, callback) {

	console.info("Sending a message to the Openkarotz TTS");

	var karotz = getOpenKarotz(config.ip);

	karotz.tts(message, config.voice, true, function(msg) {
		if (msg){
			console.info("Message correctly sent to the Openkarotz TTS");
		} else {
			console.warn("Message cannot be sent to the Openkarotz TTS");
		}
		if (callback !== undefined) {
			callback();
		}
	});
};



