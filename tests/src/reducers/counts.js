'use strict';
import {INIT_COUNTS} from '../../../src/constants/InitStates'
import reducer from '../../../src/reducers/counts'

const counts = {
	"p1": 24,
	"p2": 1
};

describe('(reducer) counts', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_COUNTS)
	})

	it('should handle LOAD_COUNTS', () => {
		expect(
			reducer(INIT_COUNTS, {
				type: 'LOAD_COUNTS',
				counts: counts
			})
		).to.deep.equal(counts)
	})

});
