'use strict';
import {INIT_COMPONENTS} from '../../../../src/ui/constants/InitStates'
import reducer from '../../../../src/ui/reducers/components'

const record = {
	"_id": "56e6509a7267ce4016109550",
	"en-US": "Add",
	"key": "ui.common.add",
	"project": ["p1", "p2"],
	"zh-TW": "新增"
};

describe('(reducer) components', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_COMPONENTS)
	})

	it('should handle SHOW_EDITMODAL', () => {
		expect(
			reducer(INIT_COMPONENTS, {
				type: 'SHOW_EDITMODAL',
				record: {}
			})
		).to.be.an('object')
		.to.have.property('showeditmodal')
			.that.is.true

		expect(
			reducer(undefined, {
				type: 'SHOW_EDITMODAL',
				record: record
			})
		).to.have.property('editrecord')
			.that.is.an('object')
			.to.contain.all.keys('_id', 'key', 'project');
	})

	it('should handle CLOSE_EDITMODAL', () => {
		expect(
			reducer({
				type: 'SHOW_EDITMODAL',
				record: record
			}, {
				type: 'CLOSE_EDITMODAL',
				record: {}
			})
		).to.be.an('object')
		.to.have.property('showeditmodal')
			.that.is.false

		expect(
			reducer({
				type: 'SHOW_EDITMODAL',
				record: record
			}, {
				type: 'CLOSE_EDITMODAL',
				record: {}
			})
		).to.have.property('editrecord')
			.that.is.an('object')
			.to.be.empty;
	})
});
