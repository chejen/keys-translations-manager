var router = require("express").Router();
var transformationUtil = require('keys-translations-manager-core/lib/transformationUtil');
var Translations = require('../models/TranslationModel');

router.route('/:visType/:project')
		.get(function(req, res) {
			var visType = req.params.visType,
				project = req.params.project,
				len,
				translation;

			Translations.find({ "project": project }, function(err, translations) {
				if (err) res.status(500).send(err);

				if (visType === "tree") {
					var rootObj = {};
					len = translations.length;
					while(len--) {
						translation = translations[len];
						rootObj = transformationUtil.properties2Json(rootObj, translation.key, translation);
					}
					res.json( transformationUtil.json2Tree(rootObj) );
				} else {
					res.json(translations);
				}
			});
		});

module.exports = router;
