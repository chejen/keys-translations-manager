'use strict';
import transformationUtil from "../../../../packages/keys-translations-manager-core/lib/transformationUtil"

let data

describe('[utility] transformationUtil', function() {
	describe('properties2Json', function() {
		before(function() {
			data = [
				['ui.common.add', 'Add'],
				['ui.message.unread', 'You have {0} unread messages.']
			];
		});

		it('should return JSON object', function() {
			var jsonObj = {},
				len = data.length,
				i = 0,
				d;

			for (; i < len; i++) {
				d = data[i];
				jsonObj = transformationUtil.properties2Json(jsonObj, d[0], d[1]);
			}

			expect(jsonObj).to.deep.equal({
				ui: {
					common: {
						add: 'Add'
					},
					message: {
						unread: 'You have {0} unread messages.'
					}
				}
			});
		});
	});


	describe('json2Properties', function() {
		before(function() {
			data = {
				"ui": {
					"common": {
						"add": "Add",
						"edit": "Edit"
					},
					"json": {
						"format": "formatted",
						"mini": "minimized"
					}
				}
			};
		});

		it('should return Properties object', function() {
			var properties = {};
			properties = transformationUtil.json2Properties(properties, data, "");
			expect(properties).to.deep.equal({
				"ui.common.add": "Add",
				"ui.common.edit": "Edit",
				"ui.json.format": "formatted",
				"ui.json.mini": "minimized"
			});
		});
	});
});
