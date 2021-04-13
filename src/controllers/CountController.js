import express from 'express'
import getTranslationModel from '../models/TranslationModel'
import configUtil from '../configUtil'
const projectIdList = configUtil.getProjectIdList()
const router = express.Router({ mergeParams: true })

router.route('/projects')
		.get(function(req, res) {
			const Translations = getTranslationModel(req.params.version)
			Translations.aggregate([{
				"$match": {
					"project": {
						"$in": projectIdList
					}
				}
			}, {
				"$unwind": "$project"
			}, {
				"$group": {
					"_id": '$project',
					"count": {"$sum": 1}
				}
			}], function (err, result) {
				if (err) {
					res.status(500).send(err);
				}
				res.json(result);
			});
		});

export default router
