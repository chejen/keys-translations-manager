'use strict';

import {expect} from 'chai'
import {INIT_TRANSLATIONS} from '../../../../src/ui/constants/InitStates'
import reducer from '../../../../src/ui/reducers/translations'

const translations = [{
	"_id": "56d7037a0b70e760104ddf10",
	"en-US": "Edit",
	"key": "ui.common.edit",
	"project": ["p1"],
	"zh-TW": "編輯"
}, {
	"_id": "56d7034f0b70e760104ddf0e",
	"en-US": "Add",
	"key": "ui.common.add",
	"project": ["p1"],
	"zh-TW": "新增"
}]

describe('(reducer) translations', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_TRANSLATIONS)
	})

	it('should handle ADD_TRANSLATION', () => {
		expect(
			reducer(translations, {
				type: 'ADD_TRANSLATION',
				data: {
					"_id": "56d7038b0b70e760104ddf11",
					"en-US": "Delete",
					"key": "ui.common.delete",
					"project": ["p1"],
					"zh-TW": "刪除"
				}
			})
		).to.deep.equal([{
			"_id": "56d7038b0b70e760104ddf11",
			"en-US": "Delete",
			"key": "ui.common.delete",
			"project": ["p1"],
			"zh-TW": "刪除"
		}, {
			"_id": "56d7037a0b70e760104ddf10",
			"en-US": "Edit",
			"key": "ui.common.edit",
			"project": ["p1"],
			"zh-TW": "編輯"
		}, {
			"_id": "56d7034f0b70e760104ddf0e",
			"en-US": "Add",
			"key": "ui.common.add",
			"project": ["p1"],
			"zh-TW": "新增"
		}])
	})

	it('should handle LOAD_TRANSLATIONS', () => {
		expect(
			reducer(INIT_TRANSLATIONS, {
				type: 'LOAD_TRANSLATIONS',
				data: translations
			})
		).to.deep.equal(translations)
	})

	it('should handle REMOVE_TRANSLATION', () => {
		expect(
			reducer(translations, {
				type: 'REMOVE_TRANSLATION',
				id: "56d7037a0b70e760104ddf10"
			})
		).to.deep.equal([{
			"_id": "56d7034f0b70e760104ddf0e",
			"en-US": "Add",
			"key": "ui.common.add",
			"project": ["p1"],
			"zh-TW": "新增"
		}])
	})

	it('should handle UPDATE_TRANSLATION', () => {
		expect(
			reducer(translations, {
				type: 'UPDATE_TRANSLATION',
				data: {
					"_id": "56d7034f0b70e760104ddf0e",
					"en-US": "Add",
					"key": "ui.common.add",
					"project": ["p1", "p2"],
					"zh-TW": "增加"
				}
			})
		).to.deep.equal([{
			"_id": "56d7037a0b70e760104ddf10",
			"en-US": "Edit",
			"key": "ui.common.edit",
			"project": ["p1"],
			"zh-TW": "編輯"
		}, {
			"_id": "56d7034f0b70e760104ddf0e",
			"en-US": "Add",
			"key": "ui.common.add",
			"project": ["p1", "p2"],
			"zh-TW": "增加"
		}])
	})
});
