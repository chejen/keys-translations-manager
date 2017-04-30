'use strict';
var transformationUtil = {
	properties2Json: function(jsonObj, propertyKey, propertyValue) {
		var childObj = {},
			keyPart,
			i,
			keyParts = propertyKey.split("."),
			lenParts = keyParts.length;

		for (i = 0; i < lenParts; i++) {
			keyPart = keyParts[i];

			if (i === lenParts - 1) {
				if (i === 0) {
					jsonObj[keyPart] = propertyValue;
				} else {
					childObj[keyPart] = propertyValue;
				}
				break;
			}

			if (i === 0) {
				if (!jsonObj[keyPart]) {
					jsonObj[keyPart] = {};
				}
				childObj = jsonObj[keyPart];
			} else {
				if (!childObj[keyPart]) {
					childObj[keyPart] = {};
				}
				childObj = childObj[keyPart];
			}
		}

		return jsonObj;
	},

	json2Properties: function(properties, jsonObj, initStr) {
		var key,
			newKey;

		for (key in jsonObj) {
			newKey = initStr ? initStr + "." + key : key;
			if (typeof jsonObj[key] === "object") {
				properties = transformationUtil.json2Properties(properties, jsonObj[key], newKey);
			} else {
				properties[newKey] = jsonObj[key];
			}
		}
		return properties;
	},

	json2Tree: function(jsonObj) {
		var ary = [];
		for (var key in jsonObj) {
			if (jsonObj[key]._id) {
				ary.push({
					"name": key,
					"translations": jsonObj[key]
				});
			} else {
				ary.push({
					"name": key,
					"children": transformationUtil.json2Tree(jsonObj[key])
				});
			}
		}
		return ary;
	},

	document2FileContent: function(translations, locale, fileType, formatted) {
		var len = translations.length,
			translation,
			rootObj = {},
			str = "",
			formatContent = function(obj) {
				if (formatted === true) { //formatted
					return JSON.stringify(obj, null, 2);
				} else { //minimized
					return JSON.stringify(obj);
				}
			};

		if (fileType === "json") { //nested JSON
			while(len--) {
				translation = translations[len];
				rootObj = transformationUtil.properties2Json(rootObj, translation.key, translation[locale]);
			}

			str = formatContent(rootObj);

		} else if (fileType === "flat") { //flat JSON
			while(len--) {
				translation = translations[len];
				rootObj[translation.key] = translation[locale];
			}

			str = formatContent(rootObj);

		} else if (fileType === "properties") {
			while(len--) {
				translation = translations[len];
				str += translation.key + "=" + translation[locale] + "\r\n";
			}
		}

		return str;
	}
};

module.exports = transformationUtil;
