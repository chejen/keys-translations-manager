/*eslint no-invalid-this: 0*/
'use strict';
var Reflux = require('reflux');
var config = require('../../config');
var host = "http://" + config.server.hostname + ":" + config.server.port;

var TranslationActions = Reflux.createActions({
	'addTranslation': { children: ['completed', 'failed'] },
	'loadTranslations': { children: ['completed', 'failed'] },
	'removeTranslation': { children: ['completed', 'failed'] },
	'updateTranslation': { children: ['completed', 'failed'] }
});

TranslationActions.addTranslation.listen(function(data) {
	$.ajax({
		url: host + '/api/translations',
		contentType: "application/json; charset=utf-8",
		type: "POST",
		data: JSON.stringify(data),
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);
});

TranslationActions.loadTranslations.listen(function() {
	$.ajax({
		url: host + '/api/translations',
		type: "GET",
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);
});

TranslationActions.removeTranslation.listen(function(id) {
	$.ajax({
		url: host + '/api/translations/' + id,
		type: "DELETE",
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);
});

TranslationActions.updateTranslation.listen(function(data) {
	console.log("TranslationActions.updateTranslation", data, data._id, data.id);
	$.ajax({
		url: host + '/api/translations/' + data._id,
		contentType: "application/json; charset=utf-8",
		type: "PUT",
		data: JSON.stringify(data),
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);
});

module.exports = TranslationActions;
