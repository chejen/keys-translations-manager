'use strict';
import path from 'path'
import importUtil from "../../../../packages/keys-translations-manager-core/lib/importUtil"
let fakeFile = path.join(__dirname, "fakeFile")
let jsonFile = path.join(__dirname, "../../../mock/translation.json")
let propertiesFile = path.join(__dirname, "../../../mock/translation.properties")

describe('[utility] importUtil', function() {
	describe('read (properties)', function() {
		it("should return err if no file found", function(done) {
			importUtil.read(fakeFile, function(err, data){
				expect(err).to.be.an('error');
				done();
			})
		});

		it("should return parsed data if a JSON file was read", function(done) {
			importUtil.read(jsonFile, function(err, type, data) {
				expect(type).to.be.eql('json');
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

		it("should return parsed data if a properties file was read", function(done) {
			importUtil.read(propertiesFile, function(err, type, data) {
				expect(type).to.be.eql('properties');
				expect(data).to.deep.eql({
					'ui.common.add': 'Add',
					'ui.common.delete': 'Delete'
				});
				done();
			})
		});


	});
});
