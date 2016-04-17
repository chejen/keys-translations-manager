var path = require("path");
var fs = require("fs");
var propertiesParser = require("properties-parser");

module.exports = {
	read: function(filename, callback) {
		fs.readFile(filename, {encoding: 'utf-8'}, function(err, data){
			if (err) {
				callback(err);
			} else {
				try {
					var data = JSON.parse(data);
					callback(null, data);
					//console.log(data);
					//process json
				} catch(e) {
					propertiesParser.read(filename, function(err, data){
						console.log(err, data);
						callback(err, data);
					})
					//process properties
				}

			}
		});
	},
	validate: function() {

	}
}
