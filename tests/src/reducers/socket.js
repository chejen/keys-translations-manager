'use strict';
import {INIT_SOCKET} from '../../../src/constants/InitStates'
import reducer from '../../../src/reducers/socket'

const record = {
	"_id": "56e6509a7267ce4016109550",
	"en-US": "Add",
	"key": "ui.common.add",
	"project": ["p1", "p2"],
	"zh-TW": "新增"
};

describe('(reducer) socket', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_SOCKET)
	})

	it('should handle ADD_TRANSLATION', () => {
		expect(
			reducer({
				emitdatachange: false
			}, {
				type: 'ADD_TRANSLATION'
			})
		).to.be.an('object')
		.to.have.property('emitdatachange')
			.that.is.true
	})

	it('should bypass LOAD_TRANSLATIONS', () => {
		expect(
			reducer({
				emitdatachange: false
			}, {
				type: 'LOAD_TRANSLATIONS'
			})
		).to.be.an('object')
		.to.have.property('emitdatachange')
			.that.is.false
	})

	it('should handle REMOVE_TRANSLATION', () => {
		expect(
			reducer({
				emitdatachange: false
			}, {
				type: 'REMOVE_TRANSLATION'
			})
		).to.be.an('object')
		.to.have.property('emitdatachange')
			.that.is.true
	})

	it('should handle UPDATE_TRANSLATION', () => {
		expect(
			reducer({
				emitdatachange: false
			}, {
				type: 'UPDATE_TRANSLATION'
			})
		).to.be.an('object')
		.to.have.property('emitdatachange')
			.that.is.true
	})

	it('should handle IMPORT_LOCALE', () => {
		expect(
			reducer({
				emitdatachange: false
			}, {
				type: 'IMPORT_LOCALE'
			})
		).to.be.an('object')
		.to.have.property('emitdatachange')
			.that.is.true
	})

	it('should handle END_DATACHANGE', () => {
		expect(
			reducer({
				emitdatachange: true
			}, {
				type: 'END_DATACHANGE'
			})
		).to.be.an('object')
		.to.have.property('emitdatachange')
			.that.is.false
	})
});
