'use strict';
import {INIT_VIS} from '../../../src/constants/InitStates'
import reducer from '../../../src/reducers/vis'

const data = [{
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
	}];

describe('(reducer) vis', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_VIS)
	})

	it('should handle LOAD_TREE_DATA', () => {
		expect(
			reducer({
				treedata: null
			}, {
				type: "LOAD_TREE_DATA",
				data: data
			})
		).to.deep.equal({
			treedata: data
		})
	})

});
