'use strict';
import * as actions from '../../../src/actions/counts'
import { INIT_COUNTS } from '../../../src/constants/InitStates'

describe('(action) counts', () => {
	describe('loadCounts', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to count all the keys of each project", (done) => {
			nock(configUtil.getHost())
				.get('/api/count/projects')
				.reply(200, [{"_id":"p1","count":28}])

			const store = mockStore(INIT_COUNTS)

			store.dispatch(actions.loadCounts())
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "LOAD_COUNTS",
							counts: {
								"p1": 28
							}
						})
				})
				.then(done)
				.catch(done)
		})
	})
})
