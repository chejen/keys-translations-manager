var Reflux = require('reflux');
var ErrorActions = require('../actions/ErrorActions');
var TranslationActions = require('../actions/TranslationActions');

var TranslationStore = Reflux.createStore({
	listenables: [TranslationActions],
	translations: [],

	getIndex: function(id) {
		return this.translations.map(function(e){
			return e._id;
		}).indexOf(id);
	},

	updateTranslations: function(translations) {
		this.translations = translations;
		this.trigger(this.translations);
	},


	/**
	 * ==========
	 *  Create
	 * ==========
	*/
	/*onAddTranslation: function (test) {
		console.log("onAddTranslation", test);
	},*/
	onAddTranslationCompleted: function(result) {
		//var translations = [result].concat(this.translations);
		var translations;
		if (result.success) {
			translations = [result.data, ...this.translations];
			this.updateTranslations(translations);
		} else {
			ErrorActions.alert(result.errors);
		}
	},
	onAddTranslationFailed: function(err) {
		console.error("onAddTranslationFailed", err);
	},


	/**
	 * ==========
	 *  Read
	 * ==========
	*/
	onLoadTranslationsCompleted: function(result) {
		this.updateTranslations(result);
	},
	onLoadTranslationsFailed: function(err) {
		console.error("onLoadTranslationsFailed", err);
	},


	/**
	 * ==========
	 *  Delete
	 * ==========
	*/
	onRemoveTranslationCompleted: function(result) {
		var index = this.getIndex(result.id),
			translations = [...this.translations.slice(0, index),
							...this.translations.slice(index + 1)];
			//translations = this.translations.slice(0, index).concat(this.translations.slice(index + 1));

		this.updateTranslations(translations);
	},
	onRemoveTranslationFailed: function(err) {
		console.error("onRemoveTranslationFailed", err);
	},


	/**
	 * ==========
	 *  Update
	 * ==========
	*/
	onUpdateTranslationCompleted: function(result) {
		var index, translations, data;
		if (result.success) {
			data = result.data;
			index = this.getIndex(data._id);
			translations = [...this.translations.slice(0, index),
							data,
							...this.translations.slice(index + 1)];

			this.updateTranslations(translations);
		} else {
			ErrorActions.alert(result.errors);
		}



	},
	onUpdateTranslationFailed: function(err) {
		console.error("onUpdateTranslationFailed", err);
	}
});

module.exports = TranslationStore;
