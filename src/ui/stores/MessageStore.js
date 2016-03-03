var Reflux = require('reflux');
var MessageActions = require('../actions/MessageActions');

var MessageStore = Reflux.createStore({
	listenables: [MessageActions],

	onLoadCompleted: function(result) {
		this.trigger(result);
	},
	onLoadFailed: function(err) {
		console.error("onLoadFailed", err);
	}
});

module.exports = MessageStore;
