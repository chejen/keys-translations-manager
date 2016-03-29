'use strict';

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai').use(sinonChai);
var expect = chai.expect;
var logUtil = require("../../../../packages/keys-translations-manager-core/lib/logUtil");

describe('[utility] logUtil', function() {
	describe('log', function() {
		beforeEach(function() {
			sinon.spy(console, 'log');
		});
		afterEach(function() {
			console.log.restore();
		});

		it("should log something with chalk", function() {
			logUtil.log('info', 'log something');
			expect(console.log).calledOnce;
		});
	});
});
