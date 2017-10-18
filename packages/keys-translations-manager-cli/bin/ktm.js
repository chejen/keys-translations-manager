#!/usr/bin/env node

var path = require('path'),
	fs = require('node-fs'),
	mongoose = require('mongoose'),
	document2FileContent = require('keys-translations-manager-core/lib/transformationUtil').document2FileContent,
	log = require('keys-translations-manager-core/lib/logUtil').log,
	yargs = require('yargs'),
	argv = yargs.argv,
	cwd = process.cwd(),
	parts = cwd.split(path.sep),
	runcom = ".ktmrc",
	schema = {
		'key': String,
		'project': [String]
	},
	count = 0,
	hash = {},
	TranslationSchema,
	Translations,
	loc, f, content, commands,
	cfg, outputs, lenOutputs;


yargs
	.usage('Usage: ktm <command> \n  where <command> is: export')
	.example('ktm export')
	.command('export', 'Export locales to specified paths.')
	.version()
	.alias('v', 'version')
	.help('help')
	.alias('h', 'help')
	.argv

commands = argv._;
if (commands[0] !== "export") {
	log('error', `Unexpected command "${commands[0]}". Use "ktm --help" for more detail.`);
	process.exit(1);
}

while(parts.length) {
	loc = parts.join(path.sep);
	f = path.join(loc, runcom);
	if (fs.existsSync(f)) {
		log('info', `Found config at ${f}`);
		content = fs.readFileSync(f, "utf8");
		cfg = JSON.parse(content);
		outputs = cfg.outputs;
		lenOutputs = outputs.length;
		break;
	}
	parts.pop();
}
if (!cfg) {
	f = path.join(process.env.HOME || process.env.USERPROFILE, runcom);
	if (fs.existsSync(f)) {
		log('info', `Found config at ${f}`);
		content = fs.readFileSync(f, "utf8");
		cfg = JSON.parse(content);
		outputs = cfg.outputs;
		lenOutputs = outputs.length;
	} else {
		log('error', `Found no ${runcom} config`);
		process.exit(1);
	}
}

mongoose.Promise = global.Promise;
mongoose.connect(cfg.database, { useMongoClient: true }, function(err) {
	if (err) {
		log('error', 'Failed to connect database !');
		log('error', err);
		process.exit(1);
	} else {
		while(lenOutputs--){
			var output = outputs[lenOutputs],
				locales = output.locales,
				lenLocales = locales.length;
			while(lenLocales--){
				hash[locales[lenLocales]] = true;
				count++;
			}
		}
		for (var key in hash) {
			schema[key] = String;
		}
		TranslationSchema = new mongoose.Schema(schema);
		Translations = mongoose.model('Translation', TranslationSchema);

		lenOutputs = outputs.length;
		while(lenOutputs--){
			var output = outputs[lenOutputs],
				locales = output.locales,
				lenLocales = locales.length,
				afterWriteFile = function(file){
					log('info', 'Successfully output to ' + file);
					if (--count === 0) {
						log('info', 'Finished!\n');
						mongoose.connection.close();
						process.exit(0);
					}
				},
				afterFail = function(err){
					log('error', err);
					mongoose.connection.close();
					process.exit(1);
				};

			locales.forEach(function(locale){
				var formatted = output.formatted,
					fileType = output.type,
					project = output.project,
					filePath = output.path.replace("${locale}", locale),
					finalFileType = fileType === "flat" ? "json" : fileType,
					file = path.join(filePath, output.filename.replace("${locale}", locale) + `.${finalFileType}`),
					query,
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
				if (formatted === true) query.sort({'key':-1});
				query.exec(function(err, translations) {
					var str;

					if (err) afterFail(err);
					str = document2FileContent(translations, locale, fileType, formatted);

					fs.writeFile(file, str, function (err) {
						if (err) {
							if (err.code === 'ENOENT'){
								fs.mkdir(filePath, 0777, true, function (err) {
									if (err) {
										afterFail(err);
									} else {
										log('info', 'Created dir: ' + filePath);
										fs.writeFile(file, str, function (err) {
											if (err) {
												afterFail(err);
											} else {
												afterWriteFile(file);
											}
										});
									}
								});
							} else {
								afterFail(err);
							}
						} else {
							afterWriteFile(file);
						}
					}); //fs.writeFile
				}); //query.exec
			}); //locales.forEach
		}
	}
}); //mongoose.connect
