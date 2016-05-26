var path = require("path");
var fs = require("fs");
var propertiesParser = require("properties-parser");

module.exports = {
	read: function(filename, callback) {
		fs.readFile(filename, {encoding: 'utf-8'}, function(err, data){
			if (err) {
				callback(err);
			} else {
				if (filename.search(/\.json$/i) >= 0) {
					data = JSON.parse(data);
					callback(null, 'json', data);

				} else if (filename.search(/\.properties$/i) >= 0) {
					propertiesParser.read(filename, function(err, data){
						callback(err, 'properties', data);
					})

				} else {
					try {
						data = JSON.parse(data);
						callback(null, 'json', data);
					} catch(e) {
						propertiesParser.read(filename, function(err, data){
							callback(err, 'properties', data);
						})
					}
				}
			}
		});
	},
	validate: function() {

	}
}
