'use strict';

var expect = require('chai').expect;
var localeUtil = require("../../../../packages/keys-translations-manager-core/lib/localeUtil");

describe('localeUtil', function() {
	describe('getMsg', function() {
		before(function() {
			localeUtil.setMessages({
				'ui': {
					'common': {
						'add': 'Add'
					},
					'message': {
						'unread': 'You have {0} unread messages.'
					}
				}
			});
		});

		it("should return a value if a key exists", function() {
			expect(localeUtil.getMsg('ui.common.add'))
				.to.be.equal('Add');
		});

		it("should replace replaceholder", function() {
			expect(localeUtil.getMsg('ui.message.unread', 3))
				.to.be.equal('You have 3 unread messages.');
		});

		it("should return `key`.undefined if a key doesn't exist", function() {
			expect(localeUtil.getMsg('ui.common.update'))
				.to.be.equal('ui.common.update.undefined');
		});
	});
});
