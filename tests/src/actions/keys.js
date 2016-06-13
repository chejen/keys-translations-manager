'use strict';
import * as actions from '../../../src/actions/keys'
import { INIT_KEYS } from '../../../src/constants/InitStates'

const data = {
	"keys":{
		"ui.common.delete":true
	},
	"mergeable":[
		[{
			"_id":"56e3f81b88cbd598067d7d60",
			"key":"ui.common.delete",
			"en-US":"Delete",
			"zh-TW":"移除",
			"__v":0,
			"project":["p2"]
		}, {
			"_id":"56e3f7fd88cbd598067d7d5e",
			"key":"ui.common.delete",
			"en-US":"Delete",
			"zh-TW":"移除",
			"__v":1,
			"project":["p1"]
		}]
	]
};

describe('(action) keys', () => {
	describe('findMergeable', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to find mergeable keys", (done) => {
			nock(configUtil.getHost())
				.get('/api/key')
				.reply(200, data)

			const store = mockStore(INIT_KEYS)

			store.dispatch(actions.findMergeable())
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "FIND_MERGEABLE",
							data: data
						})
				})
				.then(done)
				.catch(done)
		})
	})
})
