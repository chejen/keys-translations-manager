var router = require("express").Router();
var Translations = require('../models/TranslationModel');
var multiparty = require('multiparty');
var form = new multiparty.Form();

// TODO
//var read = require('keys-translations-manager-core/lib/importUtil').read;
var read = require('../../packages/keys-translations-manager-core/lib/importUtil').read;

router.route('/')
		.post(function(req, res) {
			form.parse(req, function(err, fields, files) {
				read(files.file[0].path, function(err, fileType, data){
					if (err) res.status(500).send(err);

					var locale = fields.locale[0],
						project = fields.project,
						collection = [],
						idx = 0,
						doc;

					if (fileType === "properties") {
						for (var key in data) {
							doc = {
								"key": key,
								"project": project
							}
							doc[locale] = data[key];
							collection[idx++] = doc;
						}

						Translations.collection.insert(collection, function(err, translations) {
							if (err) res.status(500).send(err);
							Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
								if (err) res.status(500).send(err);
								res.json(translations);
							});
						});
					} else if (fileType === "properties") {
						// TODO
						res.json({files: files});
					}
				});

				// delete file
				// fs.unlink(files.file[0].path, function (err) {
				// 	if (err) throw err;
				// 	console.log('successfully deleted ' + req.files.path);
				// });
			});
		});

module.exports = router;
