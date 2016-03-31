'use strict';

import {expect} from 'chai'
import {INIT_MESSAGES} from '../../../../src/ui/constants/InitStates'
import reducer from '../../../../src/ui/reducers/messages'

const lang = 'en-US'
const messages = {
	'ui': {
		'common': {
			'add': 'Add'
		},
		'message': {
			'unread': 'You have {0} unread messages.'
		}
	}
}

describe('(reducer) messages', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_MESSAGES)
	})

	it('should handle LOAD_MESSAGES', () => {
		expect(
			reducer(INIT_MESSAGES, {
				type: 'LOAD_MESSAGES',
				lang,
				messages
			})
		).to.deep.equal({
			lang: lang,
			messages: messages
		})
	})
});
