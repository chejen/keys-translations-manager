var router = require("express").Router();
var Translations = require('../models/TranslationModel');

var getUniqueElements = function(ary) {
		var o = {};
		return ary.filter(function(e) {
			return o.hasOwnProperty(e) ? false : (o[e] = true);
		});
	},
	getDiffElements = function(ary1, ary2) {
		return ary2.filter(function(i){
			return ary1.indexOf(i) < 0;
		});
	},
	validateCreation = function(data, origin, res, callback) {
		var key = data.key,
			segment = key.split("."),
			lenSegment = segment.length,
			count = 0,
			errors = [],
			tester = "",
			query;

		for (var i=0; i<=lenSegment; i++) {
			if (i === lenSegment) {
				tester = (key + ".").replace( /\./gm , "\\.");
				query = { 'key': new RegExp('^' + tester) };
			} else {
				tester += (i ? "." : "") + segment[i];
				query = { 'key': tester };
			}

			Translations.find(query, function(err, translations) {
				if (err) res.status(500).send(err);

				var tester = this.tester,
					len = translations.length,
					ary = [], // projects where the tester already exists
					p = data.project,
					l,
					idx,
					type,
					match = [],
					isMatch = false;

				while(len--) {
					ary = getUniqueElements( ary.concat(translations[len].project) );
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
						action: "c",
						origin: origin,
						params: data,
						match: match
					});
				}

				if ( (count++ === lenSegment) && (typeof callback === "function") ) {
					callback(errors);
				}
			}.bind({
					iterator: i,
					tester: tester
				})
			);

		}
	},
	validateUpdate = function(data, origin, res, callback) {
		var key = data.key,
			lenProject,
			count = 0,
			errors = [],
			tester = "",
			query,
			diffProject;

		diffProject = getDiffElements(origin.project, data.project);
		lenProject = diffProject.length;

		if (lenProject) {
			for (var i=0; i<lenProject; i++) {
				tester = key;
				query = { 'key': tester, 'project': diffProject[i] };

				Translations.find(query, function(err, translations) {
					if (err) res.status(500).send(err);

					var tester = this.tester,
						len = translations.length,
						ary = [], // projects where the tester already exists
						p = data.project,
						l,
						idx,
						type,
						match = [],
						isMatch = false;

					while(len--) {
						if (data._id != translations[len]._id) { // !== causes mismatch
							match.push(diffProject[this.iterator]);
						}
					}

					if (match.length > 0) {
						type = "equals";

						errors.push({
							key: tester,
							action: "u",
							type: type,
							origin: origin,
							params: data,
							match: match
						});
					}

					if ( (++count === lenProject) && (typeof callback === "function") ) {
						callback(errors);
					}
				}.bind({
						iterator: i,
						tester: tester
					})
				);
			}

		} else {
			callback(errors);
		}
	};

router.route('/')
		.get(function(req, res, next) {
			Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
				if (err) res.status(500).send(err);
				res.json(translations);
			});
		})
		.post(function(req, res) {
			var data = req.body,
				translation = new Translations(data);

			validateCreation(data, null, res, function(errors){
				if (errors.length > 0) {
					res.json({
						action: "c",
						success: false,
						data: null,
						errors: errors
					});
				} else {
					translation.save(function(err) {
						if (err) res.status(500).send(err);
						Translations.findById(translation._id, function(err, translation) {
							if (err) res.status(500).send(err);

							res.json({
								action: "c",
								success: true,
								data: translation,
								errors: []
							});
						});
					});
				}
			});
		});

router.route('/:id')
		.get(function(req, res) {
			Translations.findById(req.params.id, function(err, translation) {
				if (err) res.status(500).send(err);
				res.status(500).send({ error: 'Something failed!' });
			});
		})
		.put(function(req, res) {
			Translations.findById(req.params.id, function(err, translation) {
				if (err) res.status(500).send(err);

				var data = req.body;
				validateUpdate(data, translation, res, function(errors) {
					if (errors.length > 0) {
						res.json({
							action: "u",
							success: false,
							data: null,
							errors: errors
						});
					} else {
						for (var key in data) translation[key] = data[key];
						translation.save(function(err) {
							if (err) res.status(500).send(err);
							res.json({
								action: "u",
								success: true,
								data: translation,
								errors: []
							});
						});
					}
				});

			});
		})
		.delete(function(req, res) {
			Translations.remove({
				_id: req.params.id
			}, function(err, count) {
				if (err) res.status(500).send(err);
				res.json({
					id: req.params.id,
					count: count
				});
			});
		});

module.exports = router;
