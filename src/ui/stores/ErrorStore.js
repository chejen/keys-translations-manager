var Reflux = require('reflux');
var ErrorActions = require('../actions/ErrorActions');

var ErrorStore = Reflux.createStore({
	listenables: [ErrorActions],
	error: [],

	onAlert: function(error) {
		this.error = error;
		this.trigger(this.error);
	},
	
	onClear: function() {
		this.error = [];
		this.trigger(this.error);
	}
});

module.exports = ErrorStore;
