var router = require("express").Router();
var Translations = require('../models/TranslationModel');

var getUniqueElements = function(ary) {
		var o = {};
		return ary.filter(function(e) {
			return o.hasOwnProperty(e) ? false : (o[e] = true);
		});
	},
	/*getDiffElements = function(ary1, ary2) {
		return ary2.filter(function(i){
			return ary1.indexOf(i) < 0;
		});
	},*/
	validate = function(data, origin, res, action, callback) {
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

				if (action === "c") { // create
					while(len--) {
						ary = getUniqueElements( ary.concat(translations[len].project) );
					}
				} else { // update
					while(len--) {
						if (data._id != translations[len]._id) {
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

				if ( (count++ === lenSegment) && (typeof callback === "function") ) {
					callback(errors);
				}
			}.bind({
					iterator: i,
					tester: tester
				})
			);

		}
	};

router.route('/')
		.get(function(req, res, next) {
			Translations.find({}, null, {sort: {'_id': -1}}, function(err, translations) {
				if (err) res.status(500).send(err);
				res.json(translations);

///////////////
/*
				var translation,
					l = translations.length,
					keyHash = {},
					keyCollision;

				while(l--){
					translation = translations[l];
					keyCollision = keyHash[translation.key];
					if (keyCollision) {
						keyCollision.push(translation);
					} else {
						keyHash[translation.key] = [translation];
					}
				}
				console.log("keyHash", keyHash);

				for (var key in keyHash) {
					keyCollision = keyHash[key];
					console.log("keyCollision", keyCollision);
					if (keyCollision.length >= 2) {
						var translationHash = {},
							translationCollision;
						for (var j=0; j < keyCollision.length; j++) {
							var translationSet = "";
							var kc = keyCollision[j];
							var config = require('../../ktm.config');
							const locales = config.locales;
							const lenLocales = locales.length;
							for (var i=0; i<lenLocales; i++) {
								translationSet += kc[ locales[i] ];
							}
		
							translationCollision = translationHash[translationSet];
							if (translationCollision) {
								translationCollision.push(kc);
							} else {
								translationHash[translationSet] = [kc];
							}
						}
						console.log("translationHash", translationHash);
						for (var innerKey in translationHash) {
							if (translationHash[innerKey].length >= 2) {
								console.log("bingo", key, translationHash[innerKey]);
							}
						}
					}
				}
*/
//////////////////

			});
		})
		.post(function(req, res) {
			var data = req.body,
				action = "c",
				translation = new Translations(data);

			validate(data, null, res, action, function(errors){
				if (errors.length > 0) {
					res.json({
						action: action,
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
								action: action,
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

				var data = req.body,
					action = "u";
				validate(data, translation, res, action, function(errors) {
					if (errors.length > 0) {
						res.json({
							action: action,
							success: false,
							data: null,
							errors: errors
						});
					} else {
						for (var key in data) translation[key] = data[key];
						translation.save(function(err) {
							if (err) res.status(500).send(err);
							res.json({
								action: action,
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
