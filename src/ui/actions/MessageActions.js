/*eslint no-invalid-this: 0*/
'use strict';
import Reflux from 'reflux'
import configUtil from '../configUtil'

const MessageActions = Reflux.createActions({
	'load': { children: ['completed', 'failed'] }
});

MessageActions.load.listen(function(lang) {
	fetch(configUtil.getHost() + '/public/locale/' + lang + '/translation.json')
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then(this.completed)
		.catch(this.failed)
});

module.exports = MessageActions;
