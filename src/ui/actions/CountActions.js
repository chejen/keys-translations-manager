/*eslint no-invalid-this: 0*/
'use strict';
import Reflux from 'reflux'
import ConfigUtil from '../../util/ConfigUtil'

const CountActions = Reflux.createActions({
	'countByProject': { children: ['completed', 'failed'] }
});

CountActions.countByProject.listen(function() {
	fetch(ConfigUtil.getHost() + '/api/count/projects')
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then(this.completed)
		.catch(this.failed)
});

module.exports = CountActions;
