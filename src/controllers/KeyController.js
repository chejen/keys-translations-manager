var router = require("express").Router();
var mongoose = require('mongoose');
var findMergeable = require('keys-translations-manager-core/lib/mergeUtil').findMergeable;
var Translations = require('../models/TranslationModel');
var config = require('../../ktm.config');
var locales = config.locales;
var bulk, doc;

router.route('/')
		.get(function(req, res) {
			Translations.find(function(err, translations) {
				if (err) res.status(500).send(err);
				res.json(findMergeable(translations, locales));
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
					if (l > 0) { // delete
						doc.remove();
					} else { // update
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
