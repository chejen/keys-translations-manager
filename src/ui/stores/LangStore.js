var Reflux = require('reflux');
var LangActions = require('../actions/LangActions');

var LangStore = Reflux.createStore({
	listenables: [LangActions],
	lang: null,

	onSwitch: function(lang) {
		this.lang = lang;
		this.trigger(this.lang);
	}
});

module.exports = LangStore;
