'use strict';
import * as actions from '../../../src/actions/keys'
import { INIT_COUNTS } from '../../../src/constants/InitStates'

const data = [{
	"ui.common.add": [{
		"_id": "575839238ea355a0079b8f7d",
		"description": "",
		"key": "ui.common.add",
		"en-US": "Add",
		"zh-TW": "新增",
		"__v": 0,
		"project": ["p1"]
	}, {
		"_id": "56f7541a23a421640358bd65",
		"key": "ui.common.add",
		"en-US": "Add",
		"zh-TW": "新增",
		"__v": 1,
		"project": ["p2"]
	}]
}];

describe('(action) keys', () => {
	describe('findMergeable', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to find mergeable keys", (done) => {
			nock(configUtil.getHost())
				.get('/api/merge')
				.reply(200, data)

			const store = mockStore(INIT_KEYS)

			store.dispatch(actions.findMergeable())
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "FIND_MERGEABLE",
							mergerecord: data
						})
				})
				.then(done)
				.catch(done)
		})
	})
})
