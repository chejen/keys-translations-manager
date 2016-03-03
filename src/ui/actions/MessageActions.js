/*eslint no-invalid-this: 0*/
'use strict';
var Reflux = require('reflux');
var config = require('../../config');
var host = "http://" + config.server.hostname + ":" + config.server.port;

var MessageActions = Reflux.createActions({
	'load': { children: ['completed', 'failed'] }
});

MessageActions.load.listen(function(lang) {
	$.ajax({
		url: host + '/public/locale/' + lang + '/translation.json',
		type: "GET",
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);
});

module.exports = MessageActions;
