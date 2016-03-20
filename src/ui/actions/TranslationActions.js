/*eslint no-invalid-this: 0*/
'use strict';
import Reflux from 'reflux'
import configUtil from '../configUtil'
const TranslationActions = Reflux.createActions({
	'addTranslation': { children: ['completed', 'failed'] },
	'loadTranslations': { children: ['completed', 'failed'] },
	'removeTranslation': { children: ['completed', 'failed'] },
	'updateTranslation': { children: ['completed', 'failed'] }
});

TranslationActions.addTranslation.listen(function(data) {
	fetch(configUtil.getHost() + '/api/translation', {
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
});

TranslationActions.loadTranslations.listen(function() {
	fetch(configUtil.getHost() + '/api/translation')
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then(this.completed)
		.catch(this.failed)
});

TranslationActions.removeTranslation.listen(function(id) {
	fetch(configUtil.getHost() + '/api/translation/' + id, {
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
});

TranslationActions.updateTranslation.listen(function(data) {
	fetch(configUtil.getHost() + '/api/translation/' + data._id, {
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
});

module.exports = TranslationActions;
