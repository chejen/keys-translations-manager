var router = require("express").Router();
var multiparty = require('multiparty');
var form = new multiparty.Form();

// TODO
//var read = require('keys-translations-manager-core/lib/importUtil').read;
var read = require('../../packages/keys-translations-manager-core/lib/importUtil').read;

router.route('/')
		.post(function(req, res) {
			form.parse(req, function(err, fields, files) {
				res.json({files: files});
				read(files.file[0].path, function(err, fileType, data){
					if (err) res.status(500).send(err);
					console.log("fileType", fileType);
					console.log("data", data);
				});

				// delete file
				// fs.unlink(files.file[0].path, function (err) {
				// 	if (err) throw err;
				// 	console.log('successfully deleted ' + req.files.path);
				// });
			});
		});

module.exports = router;
