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

		it('should return "Add"', function() {
			expect(localeUtil.getMsg('ui.common.add'))
				.to.be.equal('Add');
		});

		it('should return "You have 3 unread messages."', function() {
			expect(localeUtil.getMsg('ui.message.unread', 3))
				.to.be.equal('You have 3 unread messages.');
		});

		it('should return "ui.common.update.undefined"', function() {
			expect(localeUtil.getMsg('ui.common.update'))
				.to.be.equal('ui.common.update.undefined');
		});
	});
});
