/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Event schema for MongoDB.
 * @author: ltoinel@free.fr
 */
 
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
 
var eventSchema = new Schema({
    nodeid: Number,
    comclass: Number,
    type: String,
    label: String,
    value: String,
    date: {type: Date, default: Date.now},
});

// Main index
eventSchema.index({ label: 1, date: 1 }, {unique: true}); // schema level

module.exports = mongoose.model('Event', eventSchema);
