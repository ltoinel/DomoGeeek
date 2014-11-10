/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Freebox Connector
 * @author: ltoinel@free.fr (code from guillaumewuip Freebox SDK)
 * https://raw.githubusercontent.com/guillaumewuip/freeboxApi_node/master/freebox.js
 */

var http         = require('http'),
	request      = require('request'),
	parseString  = require('xml2js').parseString,
	crypto       = require('crypto'),
	EventEmitter = require('events').EventEmitter;

controller = new EventEmitter();

// Freebox information
var freebox = {
		ip         : 'mafreebox.freebox.fr', //default
		port       : 80, //default
		url        : '',
		uid        : '', //freebox id
		deviceName : '',
		deviceType : '',
		apiCode    : '',
		apiVersion : '',
		apiBaseUrl : ''
	};

// Application information
var app = {
		app_id        : "domogeek", 
		app_name      : "DomoGeeek",
		app_version   : '0.1.0',
		device_name   : "domogeeek",
		app_token     : 'EAB5eMi9qGkIUHzw7TCu9+ni+BKcZySkcWMrKgSA6rrjHF7L3qBMET4/SFrCqMKJ', 
		track_id      : '7',
		status        : 'granted',
		logged_in     : false,
		challenge     : '',
		password      : '',
		session_token : '',
		permissions   : {}
	};


/**
 * Connection method.
 *
 * Example :
 *
 * freebox.connect({
 * 	'ip'        : 'mafreebox.freebox.fr', (optional)
 * 	'port'      : 80, (optional)
 * 	'app_token' : '012345', (optional)
 * 	'track_id'  : '12', (optional)
 * });
 * 
 * Update freebox information
 * 
 * @return void
 */
controller.connect = function infos(box) {

	if(typeof box != 'undefined') {
		//Update ip (optional)
		if(typeof box.ip != 'undefined') freebox.ip = box.ip;
		//Update port (optional)
		if(typeof box.port != 'undefined') freebox.port = box.port;
		//app_token (optional)
		if(typeof box.app_token != 'undefined') app.app_token = box.app_token;
		//track_id (optional)
		if(typeof box.track_id != 'undefined') app.track_id = box.track_id;
	}

	// Make the connection request call
	request('http://'+freebox.ip+'/api_version', function (error, response, body) {

		if (!error && response.statusCode == 200) 
		{
			body = JSON.parse(body);

			// Initialize the Freebox object with the api_version response
			freebox.uid        = body.uid;
			freebox.deviceName = body.device_name;
			freebox.deviceType = body.device_type;
			freebox.apiVersion = body.api_version;
			freebox.apiCode    = 'v'+body.api_version.substr(0,1);
			freebox.apiBaseUrl = body.api_base_url;

			freebox.url        = 'http://'+freebox.ip+':'+freebox.port+freebox.apiBaseUrl+freebox.apiCode+'/';

			controller.emit('ready', freebox);	
		}
		else
		{
			console.log(error);
		}

	});
}


/**
 * Register the application method.
 *
 * Example :
 *
 * freebox.register();
 *
 * Register the app to the Freebox
 * A message will be displayed on the Freebox LCD asking the user to grant/deny access to the requesting app.
 * 
 * @return void
 */
controller.register = function registerApp() {

	// Asking for an app token
	var options = {
		url    : freebox.url+'login/authorize',
		method : 'POST',
		json   : {
			   "app_id"      : app.app_id,
			   "app_name"    : app.app_name,
			   "app_version" : app.app_version,
			   "device_name" : app.device_name
			},
		encode : 'utf-8'
	};

	request(options, function (error, response, body) {
		
		if (!error && response.statusCode == 200) 
		{
			
			// Retrieve the token and the track id from the response
			app.app_token = body.result.app_token;
			app.track_id  = body.result.track_id;

			console.log("App Token: " + app.app_token);
			console.log("Track ID: " + app.track_id);
			
		} else {
			console.log(error);
		}

	});
}

/**
 * login App method
 *
 * Play before each call to the box
 * 
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function loginApp(next) {

	console.log('loginApp');
	
	if(app.status == 'granted') //If we know the app accepted by the box (user action)
	{
		//Update challenge and log the app if needed
		sessionApp(next);
	}
	else
	{
		//We check if the user has accepted the app
		request(freebox.url+'login/authorize/'+app.track_id, function (error, response, body) {

			if (!error && response.statusCode == 200) 
			{
				body = JSON.parse(body);
				app.status = body.result.status;

				if(app.status == 'granted') { //The app is accepted
					
					console.log('App is granted');
					//Go ahead : logging the app
					sessionApp(next)
				}
				else if (app.status != 'pending') //If the app is denied or timeout or revoked
				{
					console.log("The app is not accepted. You must register it.");
				}
				else
				{
					console.log("Waiting for the user to accept."); //'pending'
				}
			}
			else 
			{
				console.log(error);
			}

		});
	}
}


/**
 * sessionApp method
 *
 * Update login status and challenge.
 * If needed log the app = Ask for a session token.
 * 
 * @param  next 
 * @return void
 */
function sessionApp(next) {

	//Asking a new challenge
	request(freebox.url+'login', function (error, response, body) {

		if (!error && response.statusCode == 200) {

			body = JSON.parse(body);

			app.logged_in = body.result.logged_in; //Update login status
			app.challenge = body.result.challenge; //Update challenge

			//Update password
			app.password = crypto.createHmac('sha1', app.app_token).update(app.challenge).digest('hex'); 

			//If we're not logged_in
			if (!app.logged_in)
			{
				//POST app_id & password
				var options = {
					url    : freebox.url+'login/session/',
					method : 'POST',
					json   : {
						   "app_id"      : app.app_id,
						   "app_version" : app.app_version,
						   "password"    : app.password,
						},
					encode : 'utf-8'
				};

				request(options, function (error, response, body) {

					if ( !error && (response.statusCode == 200 || response.statusCode == 403) ) {

						app.challenge = body.result.challenge; //Update challenge

						if (response.statusCode == 200) { //OK
							app.session_token = body.result.session_token; //Save session token
							app.logged_in   = true; //Update login status
							app.permissions = body.result.permissions;

							if(next) next();
						}
						else if(response.statusCode == 403) { //Forbidden
							app.logged_in = false; //Update login status
							console.log(body.msg + ' : ' + body.error_code);
						}
					} else {
						console.log(error);
					}

				});
			}
		} else {
			console.log(error);
		}

	});

}


/**
 * downloadsStats method
 *
 * Return the download stats
 *
 * Example : 
 * 
 *  freebox.downloadsStats(function(msg){
 *		console.log(msg);
 *	});
 *
 * @see http://dev.freebox.fr/sdk/os/download/#get-the-download-stats
 * 
 */
function browserPub(next) {

	var options = {
		url : freebox.url+'lan/browser/pub/',
		headers : {
			'X-Fbx-App-Auth' : app.session_token
		}, 
		method : 'GET',
	};

	request(options, function (error, response, body) {

		body = JSON.parse(body);

		if (!error && response.statusCode == 200) 
		{
			//console.log(body.result);
			if (next != undefined){
				next(body.result); 
			}
		} else {
			console.log(body);
		}

	});
}

controller.browserPub = function (next) {
	loginApp(function(){ browserPub(next) });
};


//Exports the module
module.exports = controller;
