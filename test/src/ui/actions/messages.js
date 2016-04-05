'use strict';
import * as actions from '../../../../src/ui/actions/messages'
import { INIT_MESSAGES } from '../../../../src/ui/constants/InitStates'

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

describe('(action) messages', () => {
	describe('loadMessages', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to load messages", (done) => {
			nock(configUtil.getHost())
				.get('/public/locale/' + lang + '/translation.json')
				.reply(200, messages)

			const store = mockStore(INIT_MESSAGES)

			store.dispatch(actions.loadMessages(lang))
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "LOAD_MESSAGES",
							lang,
							messages
						})
				})
				.then(done)
				.catch(done)
		})
	})
})
