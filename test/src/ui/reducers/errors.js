'use strict';

import {expect} from 'chai'
import {INIT_ERRORS} from '../../../../src/ui/constants/InitStates'
import reducer from '../../../../src/ui/reducers/errors'

const errors = [{
	action: "c",
	key: "ui.common.add",
	match: ["p1"],
	origin: null,
	params: {
		"en-US": "Add",
		"key": "ui.common.add",
		"project": ["p1", "p2"],
		"zh-TW": "新增"
	},
	type: "equals"
}];

describe('(reducer) errors', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_ERRORS);
	})

	it('should handle ALERT_ERRORS', () => {
		expect(
			reducer(INIT_ERRORS, {
				type: 'ALERT_ERRORS',
				errors
			})
		)
		.to.be.an('array')
		.to.have.length.above(0)
		.to.have.deep.property('[0].action')
			.that.is.an('string')
			.to.be.oneOf(['c', 'u']);

		expect(
			reducer(INIT_ERRORS, {
				type: 'ALERT_ERRORS',
				errors
			})
		)
		.to.have.deep.property('[0].type')
			.that.is.an('string')
			.to.be.oneOf(["emptyfield", "equals", "belongsTo", "contains"]);
	})

	it('should handle CLEAR_ERRORS', () => {
		expect(
			reducer(errors, {
				type: 'CLEAR_ERRORS',
				errors: []
			})
		)
		.to.be.an('array')
		.to.have.lengthOf(0);
	})
});
