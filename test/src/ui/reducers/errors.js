'use strict';

import {expect} from 'chai';
import reducer from '../../../../src/ui/reducers/errors';

const errors = [{
	action: "c",
	key: "ui.grid.edit",
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
		)
		.to.be.instanceof(Array)
		.to.have.lengthOf(0);
	})

	it('should handle ALERT_ERRORS', () => {
		expect(
			reducer([], {
				type: 'ALERT_ERRORS',
				errors
			})
		).to.be.an('array')

		/*expect(
			reducer(undefined, {
				type: 'SHOW_EDITMODAL',
				record: record
			})
		).to.have.property('editrecord')
			.that.is.an('object')
			.to.contain.all.keys('_id', 'key', 'project');*/
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
