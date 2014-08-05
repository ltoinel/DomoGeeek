/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Member schema for MongoDB.
 * @author: ltoinel@free.fr
 */
 
 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var memberSchema = new Schema({
    list: ObjectId,
    date: {type: Date, default: Date.now},
    phone: String,
    name: String,
    status:{type: Number, default: 0}
});
 
module.exports = mongoose.model('Member', memberSchema);
