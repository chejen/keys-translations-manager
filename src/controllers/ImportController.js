import express from 'express'
import multiparty from 'multiparty'
import Translations from '../models/TranslationModel'
import History from '../models/HistoryModel'
import importUtil from 'keys-translations-manager-core/lib/importUtil'
import transformationUtil from 'keys-translations-manager-core/lib/transformationUtil'
const router = express.Router()
const json2Properties = transformationUtil.json2Properties

let form,
	locale,
	project,
	query,
	queryParam,
	translationOps,
	historyOps,
	doc,
	key,
	error = {},
	errors, //needs to reset every time
	action = "i";

function afterImport(historyOps, res) {
	History.bulkWrite(historyOps).then(() => {
		Translations.find({}, null, { sort: { '_id': -1 } }, (err, translations) => {
			if (err) {
				res.status(500).send(err);
			}
			res.json({
				action,
				success: true,
				data: translations,
				errors: []
			});
		});
	})
}
	
router.route('/')
		.post(function(req, res) {
			form = new multiparty.Form(); //needs to new the form every time
			form.parse(req, function(err, fields, files) {
				importUtil.read(files.file[0].path, function(err, fileType, data){
					if (err) {
						res.status(500).send(err);
					}

					if (fileType === "json") {
						data = json2Properties({}, data, "");
					}

					// check if keys conflict
					locale = fields.locale[0];
					project = fields.project;

					query = [{
						"project": project[0]
					}];
					queryParam = {};
					queryParam[locale] = { $ne: null };
					query.push(queryParam);
					queryParam = {};
					queryParam[locale] = { $ne: "" };
					query.push(queryParam);
					Translations.find({$and: query}, function(err, translations) {
						if (err) {
							res.status(500).send(err);
						}
						error = importUtil.validate(data, translations);

						errors = []; //reset for UI
						for (key in error) {
							if (error[key].length > 0) {
								errors.push({
									key: error[key],
									type: key,
									action: action
								});
							}
						}

						if (errors.length) {
							// [fail] response error messages
							res.json({
								action: action,
								success: false,
								data: null,
								errors: errors
							});
						} else {
							// [pass] batch update (or insert)
							const time = +new Date()
							const keys = []
							translationOps = []
							historyOps = []

							for (key in data) {
								if (Object.prototype.hasOwnProperty.call(data, key)) {
									keys.push(key)
									query = {
										key: key,
										project: project
									};
									doc = {};
									doc[locale] = data[key];
									translationOps.push({
										updateOne: {
											upsert: true,
											filter: query,
											update: {
												$set: doc
											}
										}
									});
								}
							}

							Translations.bulkWrite(translationOps).then(result => {
								if (result.upsertedCount) { // add
									query = {
										_id: {
											$in: Object.keys(result.upsertedIds).map(k => result.upsertedIds[k])
										}
									}

									Translations.find(query, (err, translations) => {
										if (err) {
											res.status(500).send(err);
										}

										translations.forEach(translation => {
											historyOps.push({
												insertOne: {
													document: {
														translationId: translation._id,
														logs: [{
															time,
															action: 'IMPORT',
															// user: 'system',
															translation
														}]
													}
												}
											});
										})

										afterImport(historyOps, res)
									})
								} else { // update
									query = {
										key: { $in: keys },
										project
									}

									Translations.find(query, (err, translations) => {
										if (err) {
											res.status(500).send(err);
										}

										translations.forEach(translation => {
											historyOps.push({
												updateOne: {
													filter: {
														translationId: translation._id
													},
													update: {
														$push: {
															logs: {
																time,
																action: 'IMPORT',
																// user: 'system',
																translation,
															}
														}
													}
												}
											});
										})

										afterImport(historyOps, res)
									})
								}
							});
						}
					}); //Translations.find

				}); // read
			}); //form.parse
		});

export default router
