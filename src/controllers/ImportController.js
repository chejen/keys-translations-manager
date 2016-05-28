var router = require("express").Router();
var Translations = require('../models/TranslationModel');
var multiparty = require('multiparty');

// TODO
//var read = require('keys-translations-manager-core/lib/importUtil').read;
var importUtil = require('../../packages/keys-translations-manager-core/lib/importUtil');
var json2Properties = require('../../packages/keys-translations-manager-core/lib/transformationUtil').json2Properties;

var form,
	locale,
	project,
	query,
	bulk,
	doc,
	key,
	error = {},
	errors, //needs to reset every time
	action = "i";

router.route('/')
		.post(function(req, res) {
			form = new multiparty.Form(); //needs to new the form every time
			form.parse(req, function(err, fields, files) {
				importUtil.read(files.file[0].path, function(err, fileType, data){
					if (err) res.status(500).send(err);

					if (fileType === "json") {
						data = json2Properties({}, data, "");
					}

					// check if keys conflict
					locale = fields.locale[0];
					project = fields.project;
					query = {
						"project": project
					};
					query[locale] = { $ne: null }
					Translations.find(query, function(err, translations) {
						if (err) res.status(500).send(err);
						error = importUtil.validate(data, translations);

						errors = []; //reset for UI
						for (key in error) {
							if (error[key].length > 0) {
								errors.push({
									key: error[key],
									type: key,
									action: action
								});
							}
						}

						if (errors.length) {
							// [fail] response error messages
							res.json({
								action: action,
								success: false,
								data: null,
								errors: errors
							});
						} else {
							// [pass] batch update (or insert)
							bulk = Translations.collection.initializeUnorderedBulkOp();

							for (key in data) {
								query = {
									key: key,
									project: project
								};
								doc = {};
								doc[locale] = data[key];
								bulk.find(query).upsert().updateOne({
									$set: doc
								});
							}

							bulk.execute(function(){
								Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
									if (err) res.status(500).send(err);
									res.json({
										action: action,
										success: true,
										data: translations,
										errors: []
									});
								});
							});
						}
					}); //Translations.find

				}); // read
			}); //form.parse
		});

module.exports = router;
