/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Event emitter for the ZwaveBus.
 * @author: ltoinel@free.fr
 */

// Bus event shared between the components
var bus = require( 'events' ).EventEmitter;

module.exports = new bus();
