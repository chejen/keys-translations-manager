var fs = require("fs");
var propertiesParser = require("properties-parser");

module.exports = {
	read: function(filename, callback) {
		fs.readFile(filename, {encoding: 'utf-8'}, function(err, data){
			if (err) {
				callback(err);
			} else {
				// Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
				if (data.charCodeAt(0) === 0xFEFF) {
					data = data.slice(1);  
				}

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

	validate: function(srcData, destData) {// srcData(from file); destData(from db)
		var prefix = "$$",
			lenPrefix = prefix.length,
			key,
			i,
			tmpKey,
			segment,
			lenSegment,
			lenDestData = destData.length,
			data,
			srcKey,
			destKey,
			type,
			srcHash = {},
			destHash = {},
			error = {
				"iequals": [],
				"iconflicts": []
			};

		// srcData processing
		for (key in srcData) {
			tmpKey = "";
			segment = key.split(".");
			lenSegment = segment.length;

			for (i=0; i < lenSegment; i++) {
				if (i === lenSegment - 1) {
					srcHash[key] = [key];
				} else {
					tmpKey += (i ? "." : "") + segment[i];
					srcHash[prefix + tmpKey] = [prefix + key];
				}
			}
		}

		// destData processing
		while(lenDestData--){
			tmpKey = "";
			data = destData[lenDestData];
			key = data.key;
			segment = key.split(".");
			lenSegment = segment.length;

			for (i=0; i < lenSegment; i++) {
				if (i === lenSegment - 1) {
					destHash[key] = [key];
				} else {
					tmpKey += (i ? "." : "") + segment[i];
					destHash[tmpKey] = [prefix + key];
				}
			}
		}


		// check if keys conflict
		for (key in destHash) {
			destKey = destHash[key][0];

			srcKey = srcHash[key];
			if (srcKey) {
				if (destKey.indexOf(prefix) === 0) {
					type = "iconflicts"; //"ibelongsTo"
				} else {
					type = "iequals";
				}
				error[type].push( srcKey[0] );
			}

			srcKey = srcHash[prefix + key];
			if (srcKey) {
				if (destKey.indexOf(prefix) === 0) {
					continue;
				} else {
					type = "iconflicts"; //"icontains"
				}
				error[type].push( srcKey[0].substr(lenPrefix) );
			}
		}

		return error;
	}
}
