import express from 'express'
import mongoose from 'mongoose'
import mergeUtil from 'keys-translations-manager-core/lib/mergeUtil'
import Translations from '../models/TranslationModel'
import History from '../models/HistoryModel'
import config from '../../ktm.config'
const locales = config.locales
const router = express.Router()
const findMergeable = mergeUtil.findMergeable
let bulk, doc, bulkHistory, docHistory

router.route('/')
		.get(function(req, res) {
			Translations.find(function(err, translations) {
				if (err) {
					res.status(500).send(err);
				}
				res.json(findMergeable(translations, locales));
			});
		})
		.post(function(req, res) {
			const mergeable = req.body;
			let len = mergeable.length,
				l,
				translationAry,
				translation,
				projects;

			bulk = Translations.collection.initializeUnorderedBulkOp();
			bulkHistory = History.collection.initializeUnorderedBulkOp();

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
						const log = {
							time: +new Date(),
							action: 'MERGE',
							// user: 'system',
							translation: { ...translation, project: projects },
						};
						docHistory = bulkHistory.find({
							'translationId': translation._id
						});

						if (docHistory) {
							docHistory.update({ $push: { logs: log } });
						} else {
							bulkHistory.insert({
								translationId: translation._id,
								logs: [log]
							});
						}
						doc.update({ $set: {project: projects} });
					}
				}
			}

			bulkHistory.execute();
			bulk.execute(function(){
				Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
					if (err) {
						res.status(500).send(err);
					}
					res.json({
						action: "m",
						success: true,
						data: translations,
						errors: []
					});
				});
			});
		});

export default router
