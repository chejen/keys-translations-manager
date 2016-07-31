'use strict';
import logUtil from "../../../../packages/keys-translations-manager-core/lib/logUtil"

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

			logUtil.log('warn', 'log something');
			expect(console.log).calledTwice;

			logUtil.log('error', 'log something');
			expect(console.log).calledThrice;
		});
	});
});
