import express from 'express'
import History from '../models/HistoryModel'

const router = express.Router()

const getHistoryByTranslationId = translationId => {
	return new Promise((resolve, reject) => {
		History.findOne({ translationId }, (err, history) => {
			if (err) {
				reject(err);
			}
			resolve(history);
		});
	});
}

router.route('/:translationId')
		.get((req, res) => {
			getHistoryByTranslationId(req.params.translationId)
				.then(history => {
					res.json(history);
				})
				.catch(err => {
					res.status(500).send(err);
				});
		});

export default router
