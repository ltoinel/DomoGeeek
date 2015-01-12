/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: SMTP Connector
 * @author: ltoinel@free.fr
 */
var email   = require("emailjs/email");

/**
 * Send a text email using an SMTP server.
 * 
 * @param phone The phone number.
 * @param message The message to send.
 */
exports.send = function(config, from, to, cc , subject, text) {
	
	console.info("Sending an Email to %s",to);
	 
	// Initialize the server instance
	var server  = email.server.connect({
		user:     config.username, 
		password: config.password, 
		host:     config.host, 
		tls:      config.tls ,
		ssl :     config.ssl
	});
	
	// Initialize the message to send
	var message = {
		text:    text, 
		from:    from, 
		to:      to,
		cc:      cc,
		subject: subject,
	};
	
	// Send the message and get a callback with an error or details of the message that was sent
	server.send(message, function(err, message) { 
		if (err !== null) {
			console.error(err); 
		} else {
			console.log("Email correctly sended");
		}
	});
	
	return true;
};