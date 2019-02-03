import express from 'express'
import multiparty from 'multiparty'
import Translations from '../models/TranslationModel'
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
	doc,
	key,
	error = {},
	errors, //needs to reset every time
	action = "i";

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
							translationOps = []
							for (key in data) {
								/*eslint guard-for-in: 0*/
								// if (data.hasOwnProperty(key)) { // temporarily removed to support Node v6
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
								// }
							}

							Translations.bulkWrite(translationOps).then(() => {
								Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
									if (err) {
										res.status(500).send(err);
									}
									res.json({
										action: action,
										success: true,
										data: translations,
										errors: []
									});
								});
							});
						}
					}); //Translations.find

				}); // read
			}); //form.parse
		});

export default router
