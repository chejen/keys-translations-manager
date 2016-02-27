var router = require("express").Router();
var Translations = require('../models/TranslationModel');
var config = require('../../config');

var projects = config.projects,
	lenProjects = projects.length,
	projectIdList = [];

while(lenProjects--){
	projectIdList.push(projects[lenProjects].id)
}

router.route('/projects')
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

module.exports = router;
