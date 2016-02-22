var Reflux = require('reflux');
var CountActions = require('../actions/CountActions');

var TranslationStore = Reflux.createStore({
	listenables: [CountActions],
	count: {
		projects: {},
		key: 0
	},
	
	updateCount: function(count) {
		this.count = count;
		this.trigger(this.count);
	},

	onCountByProjectCompleted: function(result) {
		var l = result.length,
			field = "_id",
			c,
			o = {};

		while(l--){
			c = result[l];
			o[c[field]] = c.count;
		}
		this.updateCount({
			projects: o,
			key: this.count.key
		});
	},
	onCountByProjectFailed: function(err) {
		console.log("onCountByProjectFailed", err);
	}
});

module.exports = TranslationStore;
