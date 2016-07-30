'use strict';
import {INIT_COMPONENTS} from '../../../src/constants/InitStates'
import reducer from '../../../src/reducers/components'

const record = {
	"_id": "56e6509a7267ce4016109550",
	"en-US": "Add",
	"key": "ui.common.add",
	"project": ["p1", "p2"],
	"zh-TW": "新增"
};
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

describe('(reducer) components', function() {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).to.deep.equal(INIT_COMPONENTS)
	})

	it('should handle SHOW_MESSAGEPOPUP', () => {
		expect(
			reducer(INIT_COMPONENTS, {
				type: 'SHOW_MESSAGEPOPUP'
			})
		).to.be.an('object')
		.to.have.property('showmessagepopup')
			.that.is.true
	})

	it('should handle CLOSE_MESSAGEPOPUP', () => {
		expect(
			reducer({
				showmessagepopup: true
			}, {
				type: 'LOAD_TRANSLATIONS'
			})
		).to.be.an('object')
		.to.have.property('showmessagepopup')
			.that.is.false

		expect(
			reducer({
				showmessagepopup: true
			}, {
				type: 'LOAD_TRANSLATIONS'
			})
		).to.be.an('object')
		.to.have.property('reloaddata')
			.that.is.false

		expect(
			reducer({
				showmessagepopup: true
			}, {
				type: 'LOAD_TREE_DATA'
			})
		).to.be.an('object')
		.to.have.property('showmessagepopup')
			.that.is.false

		expect(
			reducer({
				showmessagepopup: true
			}, {
				type: 'LOAD_TREE_DATA'
			})
		).to.be.an('object')
		.to.have.property('reloaddata')
			.that.is.false

		expect(
			reducer({
				showmessagepopup: true
			}, {
				type: 'CLOSE_MESSAGEPOPUP'
			})
		).to.be.an('object')
		.to.have.property('showmessagepopup')
			.that.is.false

		expect(
			reducer({
				showmessagepopup: true
			}, {
				type: 'CLOSE_MESSAGEPOPUP'
			})
		).to.be.an('object')
		.to.have.property('reloaddata')
			.that.is.false
	})

	it('should handle SHOW_IMPORTMODAL', () => {
		expect(
			reducer(INIT_COMPONENTS, {
				type: 'SHOW_IMPORTMODAL'
			})
		).to.be.an('object')
		.to.have.property('showimportmodal')
			.that.is.true
	})

	it('should handle CLOSE_IMPORTMODAL', () => {
		expect(
			reducer({
				showimportmodal: true
			}, {
				type: 'IMPORT_LOCALE'
			})
		).to.be.an('object')
		.to.have.property('showimportmodal')
			.that.is.false

		expect(
			reducer({
				showimportmodal: true
			}, {
				type: 'CLOSE_IMPORTMODAL'
			})
		).to.be.an('object')
		.to.have.property('showimportmodal')
			.that.is.false
	})

	it('should handle FIND_MERGEABLE', () => {
		expect(
			reducer(INIT_COMPONENTS, {
				type: 'FIND_MERGEABLE',
				data: data
			})
		).to.be.an('object')
		.to.have.property('showmergemodal')
			.that.is.true

		expect(
			reducer(undefined, {
				type: 'FIND_MERGEABLE',
				data: data
			})
		).to.have.property('keys')
			.that.is.an('object')
			.to.deep.equal(data.keys);

		expect(
			reducer(undefined, {
				type: 'FIND_MERGEABLE',
				data: data
			})
		).to.have.property('mergeable')
			.that.is.an('array')
			.to.deep.equal(data.mergeable);
	})

	it('should handle CLOSE_MERGEMODAL', () => {
		expect(
			reducer({
				showimportmodal: true
			}, {
				type: 'MERGE_TRANSLATIONS'
			})
		).to.be.an('object')
		.to.have.property('showmergemodal')
			.that.is.false

		expect(
			reducer({
				showimportmodal: true
			}, {
				type: 'CLOSE_MERGEMODAL'
			})
		).to.be.an('object')
		.to.have.property('showmergemodal')
			.that.is.false
	})

	it('should handle SHOW_EDITMODAL', () => {
		expect(
			reducer(INIT_COMPONENTS, {
				type: 'SHOW_EDITMODAL',
				record: {}
			})
		).to.be.an('object')
		.to.have.property('showeditmodal')
			.that.is.true

		expect(
			reducer(undefined, {
				type: 'SHOW_EDITMODAL',
				record: record
			})
		).to.have.property('editrecord')
			.that.is.an('object')
			.to.contain.all.keys('_id', 'key', 'project');
	})

	it('should handle CLOSE_EDITMODAL', () => {
		expect(
			reducer({
				showeditmodal: true,
				editrecord: record
			}, {
				type: 'UPDATE_TRANSLATION'
			})
		).to.be.an('object')
		.to.have.property('showeditmodal')
			.that.is.false

		expect(
			reducer({
				showeditmodal: true,
				editrecord: record
			}, {
				type: 'CLOSE_EDITMODAL'
			})
		).to.be.an('object')
		.to.have.property('showeditmodal')
			.that.is.false

		expect(
			reducer({
				showeditmodal: true,
				editrecord: record
			}, {
				type: 'CLOSE_EDITMODAL'
			})
		).to.have.property('editrecord')
			.that.is.an('object')
			.to.deep.equal(record);
	})

	it('should handle RELOAD_DATA', () => {
		expect(
			reducer(INIT_COMPONENTS, {
				type: 'RELOAD_DATA'
			})
		).to.be.an('object')
		.to.have.property('reloaddata')
			.that.is.true
	})

	it('should handle SHOW_TOOLTIP', () => {
		const state = reducer(INIT_COMPONENTS, {
				type: 'SHOW_TOOLTIP',
				top: 10,
				left: 20
			});

		expect(state).to.be.an('object')
			.to.have.property('showtooltip')
				.that.is.true

		expect(state).to.have.property('tooltiptop')
			.to.equal(10);

		expect(state).to.have.property('tooltipleft')
			.to.equal(20);
	})

	it('should handle CLOSE_TOOLTIP', () => {
		expect(
			reducer(INIT_COMPONENTS, {
				type: 'CLOSE_TOOLTIP'
			})
		).to.be.an('object')
		.to.have.property('showtooltip')
			.that.is.false
	})

});
