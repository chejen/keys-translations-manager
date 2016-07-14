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
			properties = transformationUtil.json2Properties(properties, dataJ, "");
			expect(properties).to.deep.equal({
				"ui.common.add": "Add",
				"ui.common.edit": "Edit",
				"ui.json.format": "formatted",
				"ui.json.mini": "minimized"
			});
		});
	});

	describe('json2Tree', function() {
		before(function() {
			dataJ = {
				"ui": {
					"common": {
						"delete": {
							"description": "",
							"key": "ui.common.delete",
							"en-US": "Delete",
							"zh-TW": "刪除",
							"_id": "577a868da4d9538f0f7e4ef6",
							"__v": 0,
							"project": ["p1", "p2"]
						},
						"add": {
							"description": "",
							"key": "ui.common.add",
							"en-US": "Add",
							"zh-TW": "新增",
							"_id": "577a8684a4d9538f0f7e4ef5",
							"__v": 0,
							"project": ["p1", "p2"]
						}
					}
				}
			};
		});

		it('should return tree data structure', function() {
			var tree = transformationUtil.json2Tree(dataJ);
			expect(tree).to.deep.equal([{
				"name": "ui",
				"children": [{
					"name": "common",
					"children": [{
						"name": "delete",
						"translations": {
							"description": "",
							"key": "ui.common.delete",
							"en-US": "Delete",
							"zh-TW": "刪除",
							"_id": "577a868da4d9538f0f7e4ef6",
							"__v": 0,
							"project": ["p1", "p2"]
						}
					}, {
						"name": "add",
						"translations": {
							"description": "",
							"key": "ui.common.add",
							"en-US": "Add",
							"zh-TW": "新增",
							"_id": "577a8684a4d9538f0f7e4ef5",
							"__v": 0,
							"project": ["p1", "p2"]
						}
					}]
				}]
			}]);
		});
	});
});
