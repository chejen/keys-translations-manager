import express from 'express'
import Translations from '../models/TranslationModel'
import History from '../models/HistoryModel'
const router = express.Router()
const getUniqueElements = (ary) => {
		let o = {};
		return ary.filter(e => {
			if (o.hasOwnProperty(e)) {
				return false;
			}
			o[e] = true;
			return true;
		});
	},
	getTranslationById = id => {
		return new Promise((resolve, reject) => {
			Translations.findById(id, (err, translation) => {
				if (err) {
					reject(err);
				}
				resolve(translation);
			});
		});
	},
	getHistoryByTranslationId = translationId => {
		return new Promise((resolve, reject) => {
			History.findOne({ translationId }, (err, history) => {
				if (err) {
					reject(err);
				}
				resolve(history);
			});
		});
	},
	getResponse = (data, translation, errors, action) => {
		return new Promise((resolve, reject) => {
			if (errors.length > 0) {
				resolve({
					action: action,
					success: false,
					data: null,
					errors: errors
				});
			} else {
				if (action === "u") {
					for (let key in data) {
						if (data.hasOwnProperty(key)) {
							translation[key] = data[key];
						}
					}
				}
				translation.save(function(err) {
					if (err) {
						reject(err);
					}

					getHistoryByTranslationId(translation._id)
						.then(history => {
							const log = {
								time: +new Date(),
								action: action === 'u' ? 'EDIT' : 'ADD',
								// user: 'system',
								translation,
							};

							if (history) {
								history.logs = [...history.logs, log]
							} else {
								history = new History({
									translationId: translation._id,
									logs: [log]
								});
							}

							history.save(() => {
								if (err) {
									reject(err);
								}
								resolve({
									action: action,
									success: true,
									data: translation,
									errors: []
								});
							})
						})
						.catch(err => {
							reject(err);
						});
				});
			}
		});
	},
	validate = (data, origin, res, action) => {
		return new Promise((resolve, reject) => {
			const key = data.key,
				segment = key.split("."),
				lenSegment = segment.length;
			let count = 0,
				errors = [],
				tester = "",
				query;

			for (let i=0; i <= lenSegment; i++) {
				if (i === lenSegment) {
					tester = (key + ".").replace( /\./gm , "\\.");
					query = { 'key': new RegExp('^' + tester) };
				} else {
					tester += (i ? "." : "") + segment[i];
					query = { 'key': tester };
				}

				// eslint-disable-next-line no-loop-func
				Translations.find(query, function(err, translations) {
					if (err) {
						reject(err);
					}

					const tester = this.tester;
					let len = translations.length,
						ary = [], // projects where the tester already exists
						p = data.project,
						l,
						idx,
						type,
						match = [];

					if (action === "c") { // create
						while(len--) {
							ary = getUniqueElements( ary.concat(translations[len].project) );
						}
					} else { // update
						while(len--) {
							if (data._id !== translations[len]._id.toString()) { // string vs object
								ary = getUniqueElements( ary.concat(translations[len].project) );
							}
						}
					}

					if (ary.length > 0) {
						l = p.length;
						while(l--) {
							idx = ary.indexOf(p[l]);
							if (idx >= 0) {
								match.push(p[l]);
							}
						}
					}

					if (match.length > 0) {
						if (this.iterator === lenSegment) {
							type = "belongsTo";
						} else if (this.iterator === lenSegment - 1) {
							type = "equals";
						} else {
							type = "contains";
						}

						errors.push({
							key: tester.replace( /\\\./gm , "."),
							type: type,
							action: action,
							origin: origin,
							params: data,
							match: match
						});
					}

					if (count++ === lenSegment) {
						resolve(errors);
					}
				}.bind({
						iterator: i,
						tester: tester
					})
				);
			}
		}); //eof Promise
	}; //eof validate


router.route('/')
		.get(function(req, res) {
			Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
				if (err) {
					res.status(500).send(err);
				}
				res.json(translations);
			});
		})
		.post(function(req, res) {
			const data = req.body,
				action = "c",
				translation = new Translations(data);

			validate(data, null, res, action)
				.then(errors => {
					return getResponse(data, translation, errors, action);
				})
				.then(response => {
					res.json(response);
				})
				.catch(err => {
					res.status(500).send(err);
				});
		});

router.route('/:id')
		.get(function(req, res) {
			getTranslationById(req.params.id)
				.then(translation => {
					res.json(translation);
				})
				.catch(err => {
					res.status(500).send(err);
				});
		})
		.put(function(req, res) {
			let _translation;
			const data = req.body,
				action = "u";

			getTranslationById(req.params.id)
				.then(translation => {
					_translation = translation;
					return validate(data, translation, res, action);
				})
				.then(errors => {
					return getResponse(data, _translation, errors, action);
				})
				.then(response => {
					res.json(response);
				})
				.catch(err => {
					res.status(500).send(err);
				});
		})
		.delete(function(req, res) {
			const translationId = req.params.id
			Translations.remove({
				_id: translationId
			}, function(err, count) {
				if (err) {
					res.status(500).send(err);
				}

				getHistoryByTranslationId(translationId)
					.then(history => {
						const log = {
							time: +new Date(),
							action: 'DELETE',
							// user: 'system',
							translation: null,
						};

						if (history) {
							history.isDeleted = true
							history.logs = [...history.logs, log]
						} else {
							history = new History({
								translationId: translationId,
								isDeleted: true,
								logs: [log]
							});
						}

						history.save(() => {
							if (err) {
								res.status(500).send(err);
							}
							res.json({
								id: translationId,
								count: count
							});
						})
					})
					.catch(err => {
						res.status(500).send(err);
					});
			});
		});

export default router
