'use strict';
import * as actions from '../../../src/actions/socket'

describe('(action) socket', () => {
	describe('endDataChange', () => {
		it('should create an action to update "datachange" flag', () => {
			expect(actions.endDataChange())
				.to.deep.equal({
					type: 'END_DATACHANGE'
				})
		})
	})
})
