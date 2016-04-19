var path = require("path");
var fs = require("fs");
var propertiesParser = require("properties-parser");

module.exports = {
	read: function(filename, callback) {
		fs.readFile(filename, {encoding: 'utf-8'}, function(err, data){
			if (err) {
				//console.log(err);
				callback(err);
			} else {
				try {
					//console.log('json-bingo');
					var data = JSON.parse(data);
					callback(null, 'json', data);
					//process json
				} catch(e) {
					propertiesParser.read(filename, function(err, data){
						//console.log('properties-bingo');
						//console.log(err, data);
						callback(err, 'properties', data);
					})
					//process properties
				}

			}
		});
	},
	validate: function() {

	}
}
