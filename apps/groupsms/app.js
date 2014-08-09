/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Group SMS main app
 * @author: ltoinel@free.fr
 */

// Global require
var express = require('express');
var mongoose = require('mongoose');

// Local require
var config = require('./config');
var sms = require('../../lib/sms');

// Model 
var List = require('./models/list.js');
var Member = require('./models/member.js');
var Message = require('./models/message.js');

// Init the Express App
var app = express();

// Initialize the MongoDB connection
mongoose.connect(config.database);

// Drop the database
if (config.debug){
	mongoose.connection.on('open', function(){
		mongoose.connection.db.dropDatabase(function (err) {
  			console.log('Database dropped');
		});
	});
};

/**
 * HTTP GET /sms
 * Returns:  
 */
app.get('/sms', function (req, resp, next) {

    if (!req.query['phone']){
        resp.json(400, { message: "Missing phone number"}); 
    }
    
    var phone = req.query['phone'];
    var message = req.query['text'];
    var response;

    // We return the result
    resp.json(200, { message: "SMS Received"});
	
    // Logging the received message
    console.info('SMS Received : %s => %s', phone, message);
 
    // Retrieve the member
    Member.findOne({phone: phone}, function(error, member) {

	// We save the message
	new Message({member: member, phone: phone, text: message}).save();

	// The member doesn't exist
	if (member === null){

		// We check the list in the message
		var listName = message.toLowerCase().trim();
		List.findOne({name: listName}, function(error, list) {

			// The list doesn't exist
			if (list === null){

				// The administrator can create a new list with its own phone
				if (phone === config.phone){
					var list =  new List({name: listName});
					list.save();
					new Member({list: list._id, phone: phone, name: config.name, status: 1}).save();
					response = 'Liste SMS créée : ' + list.name;
				} else {
				
				    // We reject the user that asks an unknown list
				    response = 'Votre téléphone n\'est inscrit à aucune liste SMS active';
				};

			// The list exists we add the user as a subscriber and ask him a name
			} else {
				new Member({list: list._id, phone: phone}).save();
				response = 'Veuillez préciser votre Nom et Prénom par SMS pour rejoindre la liste SMS: '+ list.name + ' (ex: Gérard Dupont)';
			};

			sms.send(config.smsgateway, phone,response);

		});

 	} else {
 		
		// We find the list of the members 
		List.findOne({_id : member.list}, function(error, list){

			// Strange, the list is missing
			if (list === null){
				throw "Missing list";
			} else {
				
				// The user send his name
				if (member.status === 0){
					member.name = message;
					member.status = 1;
					member.save();
					response = 'Bienvenue '+member.name+', votre inscription est effective à la liste SMS: ' + list.name;
					sms.send(config.smsgateway, phone,response);
 
				// If the user want to be unsubscribed
				} else if  (message.toLowerCase().trim() === list.name){
					member.remove(function (err) {
						if (err === null){
							response = 'Désinscription effective à la liste : ' + list.name;
						} else {
							response = 'Demande de désinscription en erreur à la liste : ' + list.name;
						};
						sms.send(config.smsgateway, phone,response);
					});

				} else {

                    // We send the message to all the subscribers to the list
					Member.find({list: list._id}, function(error, members){

						var count = 0;
						members.forEach(function(dest){
							if (phone !== dest.phone){
						     	sms.send(config.smsgateway, dest.phone,member.name+': '+message);
								count++;
							}
						});

						response = 'Message correctement envoyé aux '+count+' personne(s) abonnée(s) à liste SMS : '+list.name;
						sms.send(config.smsgateway, phone,response);
					});	
				};
			};
		});
	};

    });

});

/**
 * Get all the members 
 */
app.get('/members', function (req, resp, next) {
	Member.find({}, function(error, members){
		resp.json(200, { members: members});
	});
});

/**
 * Get all the lists 
 */
app.get('/lists', function (req, resp, next) {
        List.find({}, function(error, lists){
                resp.json(200, { lists: lists});
        });
});

/**
 * Get all the messages
 */
app.get('/messages', function (req, resp, next) {
        Message.find({}, function(error, messages){
                resp.json(200, { messages: messages});
        });
});


console.info("Starting DomoGeek GroupSMS v%s",config.version);

app.listen(9090); //to port on which the express server listen

