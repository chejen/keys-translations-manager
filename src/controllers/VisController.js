import express from 'express'
import transformationUtil from 'keys-translations-manager-core/lib/transformationUtil'
import Translations from '../models/TranslationModel'
const router = express.Router()

router.route('/:visType/:project')
		.get(function(req, res) {
			const visType = req.params.visType,
				project = req.params.project,
				criteria = { "project": project };
			let query,
				len,
				translation;

			query = Translations.find(criteria).sort({'key':-1});
			//Translations.find({ "project": project }, function(err, translations) {
			query.exec(function(err, translations) {
				if (err) {
					res.status(500).send(err);
				}

				if (visType === "tree") {
					let rootObj = {};
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

export default router
