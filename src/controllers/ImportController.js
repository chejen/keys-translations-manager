var router = require("express").Router();
var Translations = require('../models/TranslationModel');
var multiparty = require('multiparty');
var form = new multiparty.Form();

// TODO
//var read = require('keys-translations-manager-core/lib/importUtil').read;
var read = require('../../packages/keys-translations-manager-core/lib/importUtil').read;

var prefix = "$",
	action = "i";

router.route('/')
		.post(function(req, res) {
			form.parse(req, function(err, fields, files) {
				read(files.file[0].path, function(err, fileType, data){
					if (err) res.status(500).send(err);

					var locale = fields.locale[0],
						project = fields.project,
						query = {
							"project": project
						},
						collection = [],
						idx = 0,
						doc,
						srcHash = {},
						destHash = {},
						segment,
						lenSegment,
						tmpKey,
						errors = [];

					if (fileType === "properties") {
						for (var key in data) {
							tmpKey = "";
							segment = key.split(".");
							lenSegment = segment.length;
							for (var i=0; i < lenSegment; i++) {
								if (i === lenSegment - 1) {
									srcHash[key] = [key];
								} else {
									tmpKey += (i ? "." : "") + segment[i];
									srcHash[tmpKey] = [prefix + key];
								}
							}

							doc = {
								"key": key,
								"project": project
							};
							doc[locale] = data[key];
							collection[idx++] = doc;
						}

						query[locale] = { $ne: null }
						Translations.find(query, function(err, translations) {
							if (err) res.status(500).send(err);

							var len = translations.length,
								translation,
								key,
								srcKey,
								destKey,
								type;

							while(len--){
								tmpKey = "";
								translation = translations[len];
								key = translation.key;
								segment = key.split(".");
								lenSegment = segment.length;

								for (var i=0; i < lenSegment; i++) {
									if (i === lenSegment - 1) {
										destHash[key] = [key];
									} else {
										tmpKey += (i ? "." : "") + segment[i];
										destHash[tmpKey] = [prefix + key];
									}
								}
							}

							for (key in destHash) {
								srcKey = srcHash[key][0];

								if (srcKey) {
									destKey = destHash[key][0];
									if (srcKey.indexOf(prefix) === 0) {
										if (destKey.indexOf(prefix) === 0) {
											continue;
										} else {
											type = "icontains";
										}
									} else {
										if (destKey.indexOf(prefix) === 0) {
											type = "ibelongsTo";
										} else {
											type = "iequals";
										}
									}

									errors.push({
										key: srcKey,
										type: type,
										action: action,
										origin: key,
										params: data,
										match: destKey
									});
								}
							}

							if (errors.length) {
								res.json({
									action: action,
									success: false,
									data: null,
									errors: errors
								});
							} else {
								Translations.collection.insert(collection, function(err, translations) {
									if (err) res.status(500).send(err);
									Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
										if (err) res.status(500).send(err);
										res.json({
											action: action,
											success: true,
											data: translation,
											errors: []
										});
									});
								});
							}
						});
					} else if (fileType === "json") {
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
