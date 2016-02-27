var router = require("express").Router();
var Translations = require('../models/TranslationModel');
var config = require('../../config');

var getUniqueElements = function(ary) {
	    var o = {};
	    return ary.filter(function(e) {
	        return o.hasOwnProperty(e) ? false : (o[e] = true);
	    });
	},
	validateKey = function(data, res, callback) {
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
					match = [],
					isMatch = false;

				while(len--) ary = getUniqueElements( ary.concat(translations[len].project) );
				if (ary.length > 0) {
					l = p.length;
					while(l--) {
						idx = ary.indexOf(p[l]);
						if (idx >= 0) {
							match.push(p[l]);
							//isMatch = true;
							//break;
						}
					}
				}

				if (match.length > 0) {
					errors.push({
						raw: tester,
						type: (this.iterator === lenSegment
								? "belongsTo"
								: ((this.iterator === lenSegment - 1) ? "equals" : "contains")
							),
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
			});
		})
		.post(function(req, res) {
			var data = req.body,
				translation = new Translations(data);

			// TODO
			/*validateKey(data, res, function(errors){
				console.log("errors", errors);
			});*/

			Translations.find({'key': data.key}, function(err, translations) {
				if (err) res.status(500).send(err);

				var len = translations.length,
					ary = [],
					p = data.project,
					l,
					idx,
					isMatch = false;
					//match = [];

				while(len--) ary = getUniqueElements( ary.concat(translations[len].project) );
				if (ary.length > 0) {
					l = p.length;
					while(l--) {
						idx = ary.indexOf(p[l]);
						if (idx >= 0) {
							isMatch = true;
							break;
						}
					}
				}

				if (isMatch) {
					res.json({
						err: {
							raw: data,
							type: 'duplicated',
							match: ary
						},
						data: [],
						success: false
					});
				} else {
					translation.save(function(err) {
						if (err) res.status(500).send(err);
						Translations.findById(translation._id, function(err, translation) {
							if (err) res.status(500).send(err);
							res.json({
								data: translation,
								success: true
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
				for (var key in data) {
					translation[key] = data[key];
				}

				translation.save(function(err) {
					if (err) res.status(500).send(err);
					res.json(translation);
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
