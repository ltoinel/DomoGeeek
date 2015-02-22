/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Logger factory for Domogeeek apps
 * @author: ltoinel@free.fr
 */

exports.getLogger = function getLogger(appname) {

	var bunyan = require('bunyan');
	var logger = bunyan.createLogger({
		name : appname,
		streams : [ {
			level : 'info',
			stream : process.stdout
		// log INFO and above to stdout
		}, {
			level : 'error',
			path : '../logs/'+appname+'.log' 
		// log ERROR and above to a file
		} ]
	});

	return logger;
};