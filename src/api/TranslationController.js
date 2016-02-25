var router = require("express").Router();
var mongoose = require('mongoose');
var archiver = require('archiver');
var Translations = require('./TranslationModel');
var Properties2Json = require('../util/Properties2Json');
var config = require('../config');

var projects = config.projects,
	locales = config.locales,
	lenProjects = projects.length,
	projectIdList = [],
	getUniqueElements = function(ary) {
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


while(lenProjects--){
	projectIdList.push(projects[lenProjects].id)
}

router.route('/translations')
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

router.route('/translations/:id')
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

router.route('/count/projects')
		.get(function(req, res) {
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
				if (err) res.status(500).send(err);
				res.json(result);
			});
		});


router.route('/download/:outputType/:fileType/:project/:locale')
		.get(function(req, res) {
			var outputType = req.params.outputType, //f: format, n: none
				fileType = req.params.fileType, //json, properties
				locale = req.params.locale,
				criteria = {},
				select = {
					"_id": 0,
					"key": 1
				};

			criteria[locale] = {$exists: true};
			select[locale] = 1;
			var query = Translations.find(criteria).select(select);
			if (outputType === "f") query.sort({'key':-1});
			query.exec(function(err, translations) {
				var len,
					translation,
					rootObj = {};

				if (err) res.status(500).send(err);

				len = translations.length;
				if (fileType === "json") {
					res.set({
						"Content-Disposition": "attachment; filename=\"translation.json\"",
						"Content-Type": "application/json; charset=utf-8"
					});

					while(len--) {
						translation = translations[len];
						Properties2Json(rootObj, translation.key, translation[locale]);
					}

					if (outputType === "f") { //formatted
						res.send(JSON.stringify(rootObj, null, 2));
					} else { //minimized
						res.send(JSON.stringify(rootObj));
					}

				} else if (fileType === "properties") {
					res.set({
						"Content-Disposition": "attachment; filename=\"translation.properties\"",
						"Content-Type": "text/x-java-properties; charset=utf-8"
					});

					while(len--) {
						translation = translations[len];
						res.write(translation.key + "=" + translation[locale] + "\r\n");
					}
					res.end();
				}

			});
		});

router.route('/download/:outputType/:fileType/:project')
		.get(function(req, res) {
			var outputType = req.params.outputType, //f: format, n: none
				fileType = req.params.fileType, //json, properties
				project = req.params.project,
				criteria = {},
				select = {
					"_id": 0,
					"key": 1
				},
				lenLocales = locales.length,
				count = 0,
				locale,
				archive = archiver.create('zip', {}),
				zipHandler = function(stream, locale, fileExt) {
					archive.append(stream, { name: locale + '/translation.' + fileExt });
					if (++count === lenLocales) archive.finalize();
				};

			res.set({
				'Content-Type': 'application/zip',
				'Content-disposition': 'attachment; filename=translations.zip'
			});
			archive.pipe(res);

			for (var i=0; i<lenLocales; i++) {
				locale = locales[i];

				criteria["project"] = project;
				select[locale] = 1;
				var query = Translations.find(criteria).select(select);
				if (outputType === "f") query.sort({'key':-1});
				query.exec(function(err, translations) {
					var len,
						translation,
						rootObj = {},
						locale = this;

					if (err) res.status(500).send(err);

					len = translations.length;
					if (fileType === "json") {
						while(len--) {
							translation = translations[len];
							Properties2Json(rootObj, translation.key, translation[locale]);
						}

						if (outputType === "f") { //formatted
							zipHandler(JSON.stringify(rootObj, null, 2), locale, fileType);
						} else { //minimized
							zipHandler(JSON.stringify(rootObj), locale, fileType);
						}

					} else if (fileType === "properties") {
						var str = "";
						while(len--) {
							translation = translations[len];
							str += translation.key + "=" + translation[locale] + "\r\n";
						}
						zipHandler(str, locale, fileType);
					}
				}.bind(locale));
			}
		});

module.exports = router;
