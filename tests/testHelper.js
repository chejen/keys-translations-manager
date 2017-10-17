import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import jsdom from 'jsdom'
import React from 'react'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import config from '../ktm.config'
import configUtil from '../src/configUtil'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const { JSDOM } = jsdom
const dom = new JSDOM('<!doctype html><html><body></body></html>')
// const win = doc.defaultView
const expect = chai.use(sinonChai).expect
const middlewares = [thunk];
const mockStore = configureStore(middlewares)

global.document = dom.window.document
global.window = dom.window
global.navigator = window.navigator
global.React = React
global.sinon = sinon
global.expect = expect
global.configureStore = configureStore
global.nock = nock
global.config = config
global.configUtil = configUtil
global.mockStore = mockStore
global.shallow = Enzyme.shallow
global.mount = Enzyme.mount
global.render = Enzyme.render
