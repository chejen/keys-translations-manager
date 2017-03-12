import express from 'express'
import archiver from 'archiver'
import transformationUtil from 'keys-translations-manager-core/lib/transformationUtil'
import Translations from '../models/TranslationModel'
import config from '../../ktm.config'
const locales = config.locales
const lenLocales = locales.length
const router = express.Router()
const properties2Json = transformationUtil.properties2Json

router.route('/:outputType/:fileType/:project/:locale')
		.get(function(req, res) {
			// outputType (f: format, n: none)
			// fileType (json, properties)
			const { outputType, fileType, project, locale } = req.params

			let query,
				criteria = {
					"project": project
				},
				select = {
					"_id": 0,
					"key": 1
				};

			criteria[locale] = {$exists: true};
			select[locale] = 1;
			query = Translations.find(criteria).select(select);
			if (outputType === "f") query.sort({'key':-1});
			query.exec(function(err, translations) {
				let len,
					translation,
					rootObj = {};

				if (err) res.status(500).send(err);

				len = translations.length;
				if (fileType === "json") {
					res.set({
						"Content-Disposition": "attachment; filename=\"translation.json\"",
						"Content-Type": "application/json; charset=utf-8"
					});

					while (len--) {
						translation = translations[len];
						rootObj = properties2Json(rootObj, translation.key, translation[locale]);
					}

					if (outputType === "f") { //formatted
						res.send(JSON.stringify(rootObj, null, 2));
					} else { //minimized
						res.send(JSON.stringify(rootObj));
					}

				} else if (fileType === "properties") {
					res.set({
						"Content-Disposition": "attachment; filename=\"translation.properties\"",
						"Content-Type": "text/x-java-properties; charset=utf-8"
					});

					while (len--) {
						translation = translations[len];
						res.write(translation.key + "=" + translation[locale] + "\r\n");
					}
					res.end();
				}

			});
		});

router.route('/:outputType/:fileType/:project')
		.get(function(req, res) {
			// outputType (f: format, n: none)
			// fileType (json, properties)
			const { outputType, fileType, project } = req.params,
				archive = archiver.create('zip', {}),
				zipHandler = function(stream, locale, fileExt) {
					archive.append(stream, { name: locale + '/translation.' + fileExt });
					if (++count === lenLocales) archive.finalize();
				};

			let query,
				criteria = {},
				select = {
					"_id": 0,
					"key": 1
				},
				count = 0,
				locale;

			res.set({
				'Content-Type': 'application/zip',
				'Content-disposition': 'attachment; filename=translations.zip'
			});
			archive.pipe(res);

			for (let i = 0; i < lenLocales; i++) {
				locale = locales[i];

				criteria.project = project;
				select[locale] = 1;
				query = Translations.find(criteria).select(select);
				if (outputType === "f") query.sort({'key':-1});
				query.exec(function(err, translations) {
					let len,
						translation,
						rootObj = {},
						locale = this;

					if (err) res.status(500).send(err);

					len = translations.length;
					if (fileType === "json") {
						while (len--) {
							translation = translations[len];
							rootObj = properties2Json(rootObj, translation.key, translation[locale]);
						}

						if (outputType === "f") { //formatted
							zipHandler(JSON.stringify(rootObj, null, 2), locale, fileType);
						} else { //minimized
							zipHandler(JSON.stringify(rootObj), locale, fileType);
						}

					} else if (fileType === "properties") {
						let str = "";
						while (len--) {
							translation = translations[len];
							str += translation.key + "=" + translation[locale] + "\r\n";
						}
						zipHandler(str, locale, fileType);
					}
				}.bind(locale));
			}
		});

router.route('/csv')
		.get(function(req, res) {
			Translations.find({}, null, {sort: {'_id': 1}}, function(err, translations) {
				const delimiter = "\t"
				let len = translations.length,
					translation,
					i,
					str;

				if (err) res.status(500).send(err);

				res.set({
					"Content-Disposition": "attachment; filename=\"translations.csv\"",
					"Content-Type": "text/csv; charset=utf-8"
				});

				// header
				str = "";
				for (i = 0; i < lenLocales; i++) {
					str += delimiter + locales[i];
				}
				res.write(`Project${delimiter}Key${delimiter}Description${str}\r\n`);

				// content
				while (len--) {
					translation = translations[len];
					str = "";
					for (i = 0; i < lenLocales; i++) {
						str += delimiter + (translation[ locales[i] ] || "");
					}
					res.write(translation.project.toString()
						+ delimiter + translation.key
						+ delimiter + (translation.description || "")
						+ str + "\r\n");
				}

				res.end();
			});
		});

export default router
