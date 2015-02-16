// Loading MQTT 
var mqtt = require('mqtt');

// Global settings
var gcfg = require('../../../config');

// Create an MQTT client
var client = mqtt.connect(gcfg.mqtt.uri);

// Create message
var message = {};
message.subject = "My subject";
message.content = "My content";
message.canal = ["sms","openkarotz","email"];

// Publishing a message
client.publish('multipush', JSON.stringify(message));
