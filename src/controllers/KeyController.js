var router = require("express").Router();
var mongoose = require('mongoose');
var Translations = require('../models/TranslationModel');
var config = require('../../ktm.config');
var locales = config.locales;
var lenLocales = locales.length;
var bulk, doc;

router.route('/')
		.get(function(req, res, next) {
			Translations.find(function(err, translations) {
				if (err) res.status(500).send(err);

				var translation,
					l = translations.length,
					keyHash = {},
					keyCollision,
					translationHash,
					translationCollision,
					translationSet,
					keys = {},
					mergeable = [];

				while(l--){
					translation = translations[l];
					keyCollision = keyHash[translation.key];
					if (keyCollision) {
						keyCollision.push(translation);
					} else {
						keyHash[translation.key] = [translation];
					}
				}

				for (var key in keyHash) {
					keyCollision = keyHash[key];
					if (keyCollision.length >= 2) {
						translationHash = {};
						for (var j=0, kc; j < keyCollision.length; j++) {
							translationSet = "";
							kc = keyCollision[j];
							
							for (var i=0; i < lenLocales; i++) {
								translationSet += (kc[ locales[i] ] ? kc[ locales[i] ] : "");
							}
		
							translationCollision = translationHash[translationSet];
							if (translationCollision) {
								translationCollision.push(kc);
							} else {
								translationHash[translationSet] = [kc];
							}
						}
						
						for (var innerKey in translationHash) {
							if (translationHash[innerKey].length >= 2) {
								keys[key] = true;
								mergeable.push(translationHash[innerKey]);
							}
						}
					}
				}
				res.json({
					keys, mergeable
				});
			});
		})
		.post(function(req, res) {
			var mergeable = req.body,
				len = mergeable.length,
				l,
				translationAry,
				translation,
				projects;

			bulk = Translations.collection.initializeUnorderedBulkOp();

			while(len--){
				translationAry = mergeable[len];
				l = translationAry.length;
				projects = [];
				while(l--){
					translation = translationAry[l];
					projects = projects.concat(translation.project)
					doc = bulk.find({'_id': mongoose.Types.ObjectId(translation._id)});
					if (l > 0) {
						// delete
						doc.remove();
					} else {
						// update
						doc.update({ $set: {project: projects} });
					}
				}
			}

			bulk.execute(function(){
				Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
					if (err) res.status(500).send(err);
					res.json({
						action: "m",
						success: true,
						data: translations,
						errors: []
					});
				});
			});
		});

module.exports = router;
