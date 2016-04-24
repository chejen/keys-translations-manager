'use strict';
module.exports = {
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

	json2Properties: function(properties, obj, keyChain){
		var key,
			newChain,
			value;

		if (!obj) {
			return false;
		}
		for (key in obj) {
			newChain = keyChain.concat(key);
			value = obj[key];
			if (typeof value === "object") {
				this.json2Properties(properties, value, newChain);
			} else {
				properties.push(newChain.join(".") + "=" + value);
			}
		}
		return properties;
	}
};
