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
	}
};

module.exports = transformationUtil;
