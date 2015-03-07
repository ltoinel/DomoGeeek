/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Scheduler tasks loader
 * @author: ltoinel@free.fr
 */

// Loading all the available listeners in the current directory
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
	if (file !== 'index.js') {
		console.log('loading task: ' + file);
		exports[file] = require('./' + file + '/task.js');
	}
});
