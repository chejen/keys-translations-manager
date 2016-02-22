'use strict';
var Reflux = require('reflux');

var RecordActions = Reflux.createActions([
	'setSelectedRecord', 'getSelectedRecord'
]);

module.exports = RecordActions;
