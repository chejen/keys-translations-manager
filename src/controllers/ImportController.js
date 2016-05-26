var router = require("express").Router();
var Translations = require('../models/TranslationModel');
var multiparty = require('multiparty');

// TODO
//var read = require('keys-translations-manager-core/lib/importUtil').read;
var read = require('../../packages/keys-translations-manager-core/lib/importUtil').read;
var json2Properties = require('../../packages/keys-translations-manager-core/lib/transformationUtil').json2Properties;

var form,
	prefix = "$$",
	lenPrefix = prefix.length,
	action = "i";

router.route('/')
		.post(function(req, res) {
			form = new multiparty.Form(); //needs to new the form every time
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

					if (fileType === "json") {
						data = json2Properties({}, data, "");
					}

					for (var key in data) {
						tmpKey = "";
						segment = key.split(".");
						lenSegment = segment.length;

						for (var i=0; i < lenSegment; i++) {
							if (i === lenSegment - 1) {
								srcHash[key] = [key];
							} else {
								tmpKey += (i ? "." : "") + segment[i];
								srcHash[prefix + tmpKey] = [prefix + key];
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
							destKey = destHash[key][0];

							if (srcHash[key]) {
								srcHash[key].push(destKey);
							}
							if (srcHash[prefix + key]) {
								srcHash[prefix + key].push(destKey);
							}
						}
						console.log("srcHash", srcHash);

						for (key in srcHash) {
							var keyAry = srcHash[key];
							if (keyAry.length > 1) {
								srcKey = keyAry[0];
								destKey = keyAry[1];
								if (srcKey.indexOf(prefix) === 0) {
									if (destKey.indexOf(prefix) === 0) {
										continue;
									} else {
										type = "icontains";
										tmpKey = srcKey.substr(lenPrefix);
									}
								} else {
									if (destKey.indexOf(prefix) === 0) {
										type = "ibelongsTo";
									} else {
										type = "iequals";
									}
									tmpKey = srcKey;
								}

								errors.push({
									key: tmpKey,
									type: type,
									action: action,
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
					}); //Translations.find

				}); // read
			}); //form.parse
		});

module.exports = router;
