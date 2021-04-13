var mongoose = require('mongoose');
var config = require('../../ktm.config');

var locales = config.locales,
  lenLocales = locales.length,
  schema = {
    key: String,
    description: String,
    project: [String],
  },
  TranslationSchema;

while (lenLocales--) {
  schema[locales[lenLocales]] = String;
}

TranslationSchema = new mongoose.Schema(schema);

function getTranslationModel(collectionName = 'latest') {
  return mongoose.model('Translation', TranslationSchema, collectionName);
}

module.exports = getTranslationModel;
