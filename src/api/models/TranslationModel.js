var mongoose = require('mongoose');
var config = require('../../config');

var locales = config.locales,
	len = locales.length,
	schema = {
		'key': String,
		'project': [String]
	},
	TranslationSchema;

while(len--) schema[locales[len]] = String;
TranslationSchema = new mongoose.Schema(schema);

module.exports = mongoose.model('Translation', TranslationSchema);
