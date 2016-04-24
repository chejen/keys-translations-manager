'use strict';
import transformationUtil from "../../../../packages/keys-translations-manager-core/lib/transformationUtil"

let dataP, dataJ;

describe('[utility] transformationUtil', function() {
	describe('properties2Json', function() {
		before(function() {
			dataP = [
				['ui.common.add', 'Add'],
				['ui.message.unread', 'You have {0} unread messages.']
			];
		});

		it('should return JSON object', function() {
			var jsonObj = {},
				len = dataP.length,
				i = 0,
				d;

			for (; i < len; i++) {
				d = dataP[i];
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
			dataJ = {
				"ui": {
					"common": {
						"add": "Add",
						"delete": "Delete"
					},
					"grid": {
						"empty": "No data to display",
						"header": {
							"title": "Title",
							"name": "Name"
						}
					}
				}
			};
		});

		it('should return properties array', function() {
			var properties = transformationUtil.json2Properties([], dataJ, []);

			expect(properties).to.deep.equal([
				"ui.common.add=Add",
				"ui.common.delete=Delete",
				"ui.grid.empty=No data to display",
				"ui.grid.header.title=Title",
				"ui.grid.header.name=Name"
			]);
		});
	});
});
