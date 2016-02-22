/*eslint no-invalid-this: 0*/
'use strict';
var Reflux = require('reflux');
var config = require('../../config');
var host = "http://" + config.server.hostname + ":" + config.server.port;

var CountActions = Reflux.createActions({
	'countByProject': { children: ['completed', 'failed'] }
});

CountActions.countByProject.listen(function() {
	$.ajax({
		url: host + '/api/count/projects',
		type: "GET",
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);
});

module.exports = CountActions;
