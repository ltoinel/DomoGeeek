/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: List schema for MongoDB.
 * @author: ltoinel@free.fr
 */
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var listSchema = new Schema({
    name:  String,
    date: {type: Date, default: Date.now}
});
 
module.exports = mongoose.model('List', listSchema);
