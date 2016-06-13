'use strict';
import mergeUtil from "../../../../packages/keys-translations-manager-core/lib/mergeUtil"

describe('[utility] mergeUtil', function() {
	describe('findMergeable', function() {
		it("should return initial value if translations or locales not given", function() {
			expect(mergeUtil.findMergeable()).to.deep.eql({
				keys: {},
				mergeable: []
			});
		});

		it("should return keys{} and mergeable[] if mergeable records found", function() {
			var translations = [{
					"project": ["p1", "p2"],
					"__v": 0,
					"zh-TW": "增加",
					"en-US": "Add",
					"key": "ui.commom.add",
					"description": "",
					"_id": "575cb114b92c33281f2ef6d7"
				}, {
					"project": ["p2"],
					"__v": 1,
					"zh-TW": "刪除",
					"en-US": "Delete",
					"key": "ui.common.delete",
					"description": "",
					"_id": "575cc74ba0efba240cbf53c3"
				}, {
					"project": ["p1"],
					"__v": 0,
					"zh-TW": "刪除",
					"en-US": "Delete",
					"key": "ui.common.delete",
					"description": "",
					"_id": "575cc79ca0efba240cbf53c4"
				}, {
					"project": ["p3"],
					"__v": 0,
					"zh-TW": "移除",
					"en-US": "Delete",
					"key": "ui.common.delete",
					"description": "",
					"_id": "575cc7a3a0efba240cbf53c5"
				}, {
					"project": ["p4"],
					"__v": 0,
					"zh-TW": "移除",
					"en-US": "Delete",
					"key": "ui.common.delete",
					"description": "",
					"_id": "575cc7a5a0efba240cbf53c6"
				}],
				locales = ["en-US", "zh-TW"];

			expect(mergeUtil.findMergeable(translations, locales)).to.deep.eql({
				"keys": {
					"ui.common.delete": true
				},
				"mergeable": [
					[{
						"_id": "575cc7a5a0efba240cbf53c6",
						"description": "",
						"key": "ui.common.delete",
						"en-US": "Delete",
						"zh-TW": "移除",
						"__v": 0,
						"project": ["p4"]
					}, {
						"_id": "575cc7a3a0efba240cbf53c5",
						"description": "",
						"key": "ui.common.delete",
						"en-US": "Delete",
						"zh-TW": "移除",
						"__v": 0,
						"project": ["p3"]
					}], [{
						"_id": "575cc79ca0efba240cbf53c4",
						"description": "",
						"key": "ui.common.delete",
						"en-US": "Delete",
						"zh-TW": "刪除",
						"__v": 0,
						"project": ["p1"]
					}, {
						"_id": "575cc74ba0efba240cbf53c3",
						"description": "",
						"key": "ui.common.delete",
						"en-US": "Delete",
						"zh-TW": "刪除",
						"__v": 1,
						"project": ["p2"]
					}]
				]
			});
		});
	});
});
