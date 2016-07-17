'use strict';
import * as actions from '../../../src/actions/vis'
import { INIT_VIS } from '../../../src/constants/InitStates'

const projectId = "p1",
		data = [{
			"name": "ui",
			"children": [{
				"name": "common",
				"children": [{
					"name": "delete",
					"translations": {
						"description": "",
						"key": "ui.common.delete",
						"en-US": "Delete",
						"zh-TW": "刪除",
						"_id": "577a868da4d9538f0f7e4ef6",
						"__v": 0,
						"project": ["p1", "p2"]
					}
				}, {
					"name": "add",
					"translations": {
						"description": "",
						"key": "ui.common.add",
						"en-US": "Add",
						"zh-TW": "新增",
						"_id": "577a8684a4d9538f0f7e4ef5",
						"__v": 0,
						"project": ["p1", "p2"]
					}
				}]
			}]
		}];

describe('(action) vis', () => {
	describe('loadTreeData', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to load data for tree layout", (done) => {
			nock(configUtil.getHost())
				.filteringPath(/t=[^&]*/g, 't=123')
				.get(`/api/vis/tree/${projectId}?t=123`)
				.reply(200, data)

			const store = mockStore(INIT_VIS)

			store.dispatch(actions.loadTreeData(projectId))
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "LOAD_TREE_DATA",
							data: data
						})
				})
				.then(done)
				.catch(done)
		})
	})
})
