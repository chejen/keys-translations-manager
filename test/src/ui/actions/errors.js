'use strict';

import {expect} from 'chai'
import * as action from '../../../../src/ui/actions/errors'

const errors = [];

describe('(action) errors', () => {
	describe('alertErrors', () => {
		it('should create an action to generate an error list', () => {
			expect(action.alertErrors(errors))
				.to.deep.equal({
					type: 'ALERT_ERRORS',
					errors
				})
		})
	})

	describe('clearErrors', () => {
		it('should create an action to clear error list', () => {
			expect(action.clearErrors())
				.to.deep.equal({
					type: 'CLEAR_ERRORS',
					errors: []
				})
		})
	})
})
