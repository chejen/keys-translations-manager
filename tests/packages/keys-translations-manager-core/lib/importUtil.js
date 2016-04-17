'use strict';
import path from 'path'
import importUtil from "../../../../packages/keys-translations-manager-core/lib/importUtil"
let fakeFile = path.join(__dirname, "fakeFile")
let propertiesFile = path.join(__dirname, "../../../mock/translation.properties")
let jsonFile = path.join(__dirname, "../../../mock/translation.json")

describe('[utility] importUtil', function() {
	describe('read (properties)', function() {
		it("should return err if no file found", function(done) {
			importUtil.read(fakeFile, function(err, data){
				expect(err).to.be.an('error');
				done();
			})
		});

		it("should return parsed data if a properties file was read", function(done) {
			importUtil.read(propertiesFile, function(err, data) {
				expect(data).to.not.be.undefined;
				expect(data).to.deep.eql({
					'ui.common.add': 'Add',
					'ui.common.delete': 'Delete'
				});
				done();
			})
		});

		it("should return parsed data if a JSON file was read", function(done) {
			importUtil.read(jsonFile, function(err, data) {
				expect(data).to.not.be.undefined;
				expect(data).to.deep.eql({
					"ui": {
						"common": {
							"add": "Add",
							"delete": "Delete"
						}
					}
				});
				done();
			})
		});
	});
});
