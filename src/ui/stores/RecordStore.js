var Reflux = require('reflux');
var RecordActions = require('../actions/RecordActions');

var RecordStore = Reflux.createStore({
	listenables: [RecordActions],
	selectedRecord: null,

	onSetSelectedRecord: function(record) {
		this.selectedRecord = record;
		this.trigger(this.selectedRecord);
	},
	onGetSelectedRecord: function() {
		this.trigger(this.selectedRecord);
	}
});

module.exports = RecordStore;
