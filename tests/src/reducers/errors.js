'use strict';
import {INIT_ERRORS} from '../../../src/constants/InitStates'
import reducer from '../../../src/reducers/errors'

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
		const ary = reducer(INIT_ERRORS, {
			type: 'ALERT_ERRORS',
			errors
		});

		expect(ary)
		.to.be.an('array')
		.to.have.length.above(0)

		expect(ary[0])
		.to.have.property('action')
			.that.is.a('string')
			.to.be.oneOf(['c', 'u']);

		expect(ary[0])
		.to.have.property('type')
			.that.is.an('string')
			.to.be.oneOf(["emptyfield", "equals", "belongsTo", "contains"]);
	})

	it('should handle CLEAR_ERRORS', () => {
		expect(
			reducer(errors, {
				type: 'LOAD_MESSAGES',
				errors: []
			})
		)
		.to.be.an('array')
		.to.have.lengthOf(0);

		expect(
			reducer(errors, {
				type: 'LOAD_COUNTS',
				errors: []
			})
		)
		.to.be.an('array')
		.to.have.lengthOf(0);

		expect(
			reducer(errors, {
				type: 'SHOW_EDITMODAL',
				errors: []
			})
		)
		.to.be.an('array')
		.to.have.lengthOf(0);

		expect(
			reducer(errors, {
				type: 'SHOW_IMPORTMODAL',
				errors: []
			})
		)
		.to.be.an('array')
		.to.have.lengthOf(0);

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
