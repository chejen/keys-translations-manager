'use strict';
import * as actions from '../../../../src/ui/actions/translations'
import { INIT_TRANSLATIONS } from '../../../../src/ui/constants/InitStates'

const translations = [{
	"_id": "56d7037a0b70e760104ddf10",
	"en-US": "Edit",
	"key": "ui.common.edit",
	"project": ["p1"],
	"zh-TW": "編輯"
}, {
	"_id": "56d7034f0b70e760104ddf0e",
	"en-US": "Add",
	"key": "ui.common.add",
	"project": ["p1"],
	"zh-TW": "新增"
}]

describe('(action) translations', () => {
	describe('addTranslation', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to add a translation", (done) => {
			nock(configUtil.getHost(), {
					reqheaders: {
						'Accept': 'application/json; charset=utf-8',
						'Content-Type': 'application/json; charset=utf-8'
					}
				})
				.post('/api/translation', {
					"key": "ui.common.delete",
					"en-US": "Delete",
					"zh-TW": "刪除",
					"project": ["p1"]
				})
				.reply(200, {
					"action": "c",
					"success": true,
					"data": {
						"key": "ui.common.delete",
						"en-US": "Delete",
						"zh-TW": "刪除",
						"_id": "56d7038b0b70e760104ddf11",
						"__v": 0,
						"project": ["p1"]
					},
					"errors": []
				});

			const store = mockStore(INIT_TRANSLATIONS)

			store.dispatch(actions.addTranslation({
					"key": "ui.common.delete",
					"en-US": "Delete",
					"zh-TW": "刪除",
					"project": ["p1"]
				}))
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "ADD_TRANSLATION",
							data: {
								"key": "ui.common.delete",
								"en-US": "Delete",
								"zh-TW": "刪除",
								"_id": "56d7038b0b70e760104ddf11",
								"__v": 0,
								"project": ["p1"]
							}
						})
				})
				.then(done)
				.catch(done)
		})
	})

	describe('loadTranslations', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to load translations", (done) => {
			nock(configUtil.getHost())
				.get('/api/translation')
				.reply(200, translations)

			const store = mockStore(INIT_TRANSLATIONS)

			store.dispatch(actions.loadTranslations())
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "LOAD_TRANSLATIONS",
							data: translations
						})
				})
				.then(done)
				.catch(done)
		})
	})

	describe('removeTranslation', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to remove a translation", (done) => {
			nock(configUtil.getHost())
				.delete('/api/translation/56d7037a0b70e760104ddf10')
				.reply(200, {
					"id": "56d7037a0b70e760104ddf10",
					"count": {
						"ok": 1,
						"n": 1
					}
				});

			const store = mockStore(INIT_TRANSLATIONS)

			store.dispatch(actions.removeTranslation("56d7037a0b70e760104ddf10"))
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							type: "REMOVE_TRANSLATION",
							id: "56d7037a0b70e760104ddf10"
						})
				})
				.then(done)
				.catch(done)
		})
	})

	describe('updateTranslation', () => {
		afterEach(() => {
			nock.cleanAll()
		})

		it("should create an action to update a translation", (done) => {
			nock(configUtil.getHost())
				.put('/api/translation/56d7034f0b70e760104ddf0e')
				.reply(200, {
					"action": "u",
					"success": true,
					"data": {
						"key": "ui.common.add",
						"en-US": "Add",
						"zh-TW": "增加",
						"_id": "56d7034f0b70e760104ddf0e",
						"__v": 0,
						"project": ["p1"]
					},
					"errors": []
				});

			const store = mockStore(INIT_TRANSLATIONS)

			store.dispatch(actions.updateTranslation({
					"key": "ui.common.add",
					"en-US": "Add",
					"zh-TW": "增加",
					"_id": "56d7034f0b70e760104ddf0e",
					"__v": 0,
					"project": ["p1"]
				}))
				.then(() => {
					expect(store.getActions()[0])
						.to.deep.equal({
							"type": "UPDATE_TRANSLATION",
							"data": {
								"key": "ui.common.add",
								"en-US": "Add",
								"zh-TW": "增加",
								"_id": "56d7034f0b70e760104ddf0e",
								"__v": 0,
								"project": ["p1"]
							}
						})
				})
				.then(done)
				.catch(done)
		})
	})

//

//{"action":"u","success":true,"data":{"key":"test","en-US":"qwe","zh-TW":"test","_id":"56fd4f68bd9c29d11abcd812","__v":0,"project":["p1","p2"]},"errors":[]}


})
