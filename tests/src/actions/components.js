'use strict';
import * as actions from '../../../src/actions/components'

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

	describe('closeMergeModal', () => {
		it('should create an action to close MergeModal', () => {
			expect(actions.closeMergeModal())
				.to.deep.equal({
					type: 'CLOSE_MERGEMODAL'
				})
		})
	})

	describe('showImportModal', () => {
		it('should create an action to show ImportModal', () => {
			expect(actions.showImportModal())
				.to.deep.equal({
					type: 'SHOW_IMPORTMODAL'
				})
		})
	})

	describe('closeImportModal', () => {
		it('should create an action to close ImportModal', () => {
			expect(actions.closeImportModal())
				.to.deep.equal({
					type: 'CLOSE_IMPORTMODAL'
				})
		})
	})

	describe('showMessagePopup', () => {
		it('should create an action to show MessagePopup', () => {
			expect(actions.showMessagePopup())
				.to.deep.equal({
					type: 'SHOW_MESSAGEPOPUP'
				})
		})
	})

	describe('closeMessagePopup', () => {
		it('should create an action to close MessagePopup', () => {
			expect(actions.closeMessagePopup())
				.to.deep.equal({
					type: 'CLOSE_MESSAGEPOPUP'
				})
		})
	})
})
