import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import React from 'react'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import config from '../ktm.config'
import configUtil from '../src/configUtil'
import { shallow } from 'enzyme'

const expect = chai.use(sinonChai).expect
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

global.React = React
global.sinon = sinon
global.expect = expect
global.configureStore = configureStore
global.nock = nock
global.config = config
global.configUtil = configUtil
global.mockStore = mockStore
global.shallow = shallow
