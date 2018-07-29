'use strict';
import historyUtil from "../../../../packages/keys-translations-manager-core/lib/historyUtil"

describe('[utility] historyUtil', function() {
	describe('diff', function() {
		it("should return false if no arguments given", function() {
			expect(historyUtil.differentiate()).to.be.false;
		});

		it("should find additions if new value is added", function() {
			const prevLog = {
					"project": ["p1", "p2"],
					"en-US": "Add",
					"key": "ui.commom.add",
				},
				log = {
					"project": ["p1", "p2"],
					"en-US": "Add",
					"key": "ui.commom.add",
					"description": "new desc",
				};

			expect(historyUtil.differentiate(prevLog, log)).to.deep.eql({
				"project": {
					"original": ["p1", "p2"]
				},
				"en-US": {
					"original": "Add"
				},
				"key": {
					"original": "ui.commom.add"
				},
				"description": {
					"addition": "new desc"
				}
			});
		});

		it("should have no difference if logs are the same", function() {
			const prevLog = {
					"project": ["p1", "p2"],
					"en-US": "Add",
					"key": "ui.commom.add",
					"description": "new desc",
				},
				log = {
					"project": ["p2", "p1"], // different order is fine
					"en-US": "Add",
					"key": "ui.commom.add",
					"description": "new desc",
				};

			expect(historyUtil.differentiate(prevLog, log)).to.deep.eql({
				"project": {
					"original": ["p1", "p2"]
				},
				"en-US": {
					"original": "Add"
				},
				"key": {
					"original": "ui.commom.add"
				},
				"description": {
					"original": "new desc"
				}
			});
		});

		it("should find additions and deletions if the value is modified", function() {
			const prevLog = {
					"project": ["p1", "p2"],
					"en-US": "Add",
					"key": "ui.commom.add",
					"description": "new desc",
				},
				log = {
					"project": ["p2"],
					"en-US": "Add",
					"key": "ui.commom.add",
					"description": "updated desc",
				};

			expect(historyUtil.differentiate(prevLog, log)).to.deep.eql({
				"project": {
					"addition": ["p2"],
					"deletion": ["p1", "p2"],
				},
				"en-US": {
					"original": "Add"
				},
				"key": {
					"original": "ui.commom.add"
				},
				"description": {
					"addition": "updated desc",
					"deletion": "new desc",
				}
			});
		});

		it("should find deletions if the value is removed", function() {
			const prevLog = {
					"project": ["p1", "p2"],
					"en-US": "Add",
					"key": "ui.commom.add",
					"description": "updated desc",
				},
				log = {
					"project": ["p1", "p2"],
					"en-US": "Add",
					"key": "ui.commom.add",
				};

			expect(historyUtil.differentiate(prevLog, log)).to.deep.eql({
				"project": {
					"original": ["p1", "p2"]
				},
				"en-US": {
					"original": "Add"
				},
				"key": {
					"original": "ui.commom.add"
				},
				"description": {
					"deletion": "updated desc"
				}
			});
		});
	});
});
