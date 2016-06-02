'use strict';
import path from 'path'
import importUtil from "../../../../packages/keys-translations-manager-core/lib/importUtil"
let fakeFile = path.join(__dirname, "fakeFile")
let jsonFile = path.join(__dirname, "../../../mock/translation.json")
let propertiesFile = path.join(__dirname, "../../../mock/translation.properties")
let fileWithNoExt = path.join(__dirname, "../../../mock/translation")

describe('[utility] importUtil', function() {
	describe('read', function() {
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

		it("should parse data even if the file has no filename extension", function(done) {
			importUtil.read(fileWithNoExt, function(err, type, data) {
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
	});

	describe('validate', function() {
		it("return errors if keys conflict", function() {
			var srcData = {
					"ui.common.add": "Add",
					"ui.common.delete": "Delete",
					"ui.file.type.json": "JSON",
					"ui.test": "Test"
				},
				destData = [{
					"project": ["p2"],
					"en-US": "ADD",
					"key": "ui.common.add"
				}, {
					"project": ["p2"],
					"en-US": "File Type",
					"key": "ui.file.type"
				}, {
					"project": ["p2"],
					"zh-TW": "測試...",
					"en-US": "Test Desc",
					"key": "ui.test.desc",
					"description": "qwe"
				}],
				error;

			error = importUtil.validate(srcData, destData);
			expect(error).to.deep.eql({
				iequals: ['ui.common.add'],
				iconflicts: ['ui.test', 'ui.file.type.json']
			});
		});
	});
});
