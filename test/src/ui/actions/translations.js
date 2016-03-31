'use strict';

import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import {expect} from 'chai'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import configUtil from '../../../../src/ui/configUtil'
import * as actions from '../../../../src/ui/actions/translations'
import { INIT_TRANSLATIONS } from '../../../../src/ui/constants/InitStates'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
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
})
