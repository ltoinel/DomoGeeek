/**
 * DomoGeeek v1.0
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Message schema for MongoDB.
 * @author: ltoinel@free.fr
 */
 
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
 
var messageSchema = new Schema({
    member: ObjectId,
    phone: String,
    date: {type: Date, default: Date.now},
    text: String
});
 
module.exports = mongoose.model('Message', messageSchema);
