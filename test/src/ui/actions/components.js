'use strict';

import {expect} from 'chai'
import * as actions from '../../../../src/ui/actions/components'

const record = {
	"_id": "56e6509a7267ce4016109550",
	"en-US": "Add",
	"key": "ui.common.add",
	"project": ["p1", "p2"],
	"zh-TW": "新增"
};

describe('(action) components', () => {
	describe('showEditModal', () => {
		it('should create an action to show EditModal', () => {
			expect(actions.showEditModal(record))
				.to.deep.equal({
					type: 'SHOW_EDITMODAL',
					record
				})
		})
	})

	describe('closeEditModal', () => {
		it('should create an action to close EditModal', () => {
			expect(actions.closeEditModal())
				.to.deep.equal({
					type: 'CLOSE_EDITMODAL'
				})
		})
	})
})
