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
require('es6-promise').polyfill();
require('isomorphic-fetch');


TranslationActions.addTranslation.listen(function(data) {
	fetch(host + '/api/translation', {
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8'
		},
		method: 'POST',
		body: JSON.stringify(data)
	})
	.then(res => {
		if (res.status >= 400) {
			throw new Error(res.status + ", " + res.statusText);
		}
		return res.json();
	})
	.then(this.completed)
	.catch(this.failed)
	/*$.ajax({
		url: host + '/api/translation',
		contentType: "application/json; charset=utf-8",
		type: "POST",
		data: JSON.stringify(data),
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);*/
});

TranslationActions.loadTranslations.listen(function() {
	fetch(host + '/api/translation')
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then(this.completed)
		.catch(this.failed)
	/*$.ajax({
		url: host + '/api/translation',
		type: "GET",
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);*/
});

TranslationActions.removeTranslation.listen(function(id) {
	fetch(host + '/api/translation/' + id, {
		method: 'DELETE'
	})
	.then(res => {
		if (res.status >= 400) {
			throw new Error(res.status + ", " + res.statusText);
		}
		return res.json();
	})
	.then(this.completed)
	.catch(this.failed)
	/*$.ajax({
		url: host + '/api/translation/' + id,
		type: "DELETE",
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);*/
});

TranslationActions.updateTranslation.listen(function(data) {
	fetch(host + '/api/translation/' + data._id, {
		headers: {
			'Accept': 'application/json; charset=utf-8',
			'Content-Type': 'application/json; charset=utf-8'
		},
		method: 'PUT',
		body: JSON.stringify(data)
	})
	.then(res => {
		if (res.status >= 400) {
			throw new Error(res.status + ", " + res.statusText);
		}
		return res.json();
	})
	.then(this.completed)
	.catch(this.failed)
	/*$.ajax({
		url: host + '/api/translation/' + data._id,
		contentType: "application/json; charset=utf-8",
		type: "PUT",
		data: JSON.stringify(data),
		dataType: "json"
	})
	.done(this.completed)
	.fail(this.failed);*/
});

module.exports = TranslationActions;
