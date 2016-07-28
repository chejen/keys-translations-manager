'use strict';
import timingUtil from "../../../../packages/keys-translations-manager-core/lib/timingUtil"

describe('[utility] timingUtil', function() {
	describe('setTimeoutId', function() {
		before(function() {
			timingUtil.setTimeoutId(123);
		});

		it("should set timeoutId", function() {
			expect(timingUtil.timeoutId).to.eql(123);
		});
	});

	describe('getTimeoutId', function() {
		before(function() {
			timingUtil.setTimeoutId(123);
		});

		it("should return timeoutId", function() {
			expect(timingUtil.getTimeoutId()).to.be.equal(123);
		});
	});
});
