'use strict';
import * as actions from '../../../../src/ui/actions/errors'

const errors = [];

describe('(action) errors', () => {
	describe('alertErrors', () => {
		it('should create an action to generate an error list', () => {
			expect(actions.alertErrors(errors))
				.to.deep.equal({
					type: 'ALERT_ERRORS',
					errors
				})
		})
	})

	describe('clearErrors', () => {
		it('should create an action to clear error list', () => {
			expect(actions.clearErrors())
				.to.deep.equal({
					type: 'CLEAR_ERRORS',
					errors: []
				})
		})
	})
})
