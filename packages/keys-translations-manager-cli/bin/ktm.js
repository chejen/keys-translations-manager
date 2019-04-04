#!/usr/bin/env node

var path = require('path'),
	fs = require('node-fs'),
	mongoose = require('mongoose'),
	document2FileContent = require('keys-translations-manager-core/lib/transformationUtil').document2FileContent,
	log = require('keys-translations-manager-core/lib/logUtil').log,
	yargs = require('yargs'),
	inquirer = require('inquirer'),
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
	loc, f, content, commands, command,
	cfg, outputs, lenOutputs;


yargs
	.usage('Usage: ktm <command> \n  where <command> is: export or reset')
	.example('ktm export')
	.command('export', 'Export locales to specified paths.')
	.command('reset', 'Drop the database used in KTM.')
	.version()
	.alias('v', 'version')
	.help('help')
	.alias('h', 'help')
	.argv

commands = argv._;
command = commands[0]
if (['export', 'reset'].indexOf(command) === -1) {
	log('error', `Unexpected command "${command}". Use "ktm -h" for more detail.`);
	process.exit(1);
}

while(parts.length) {
	loc = parts.join(path.sep);
	f = path.join(loc, runcom);
	if (fs.existsSync(f)) {
		log('info', `Found config at ${f}`);
		content = fs.readFileSync(f, "utf8");
		cfg = JSON.parse(content);
		if (command === 'export') {
			outputs = cfg.outputs;
			lenOutputs = outputs.length;
		}
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
		if (command === 'export') {
			outputs = cfg.outputs;
			lenOutputs = outputs.length;
		}
	} else {
		log('error', `Found no ${runcom} config`);
		process.exit(1);
	}
}

mongoose.Promise = global.Promise;

mongoose.connect(cfg.database, {
	useNewUrlParser: true,
	socketTimeoutMS: 90000,
	connectTimeoutMS: 90000
}).then(
	function() {
		if (command === 'reset') {
			var segment = cfg.database.split('/');
			var db = segment[segment.length - 1];
			var num1 = Math.floor(Math.random() * 10);
			var num2 = Math.floor(Math.random() * 10);
			inquirer.prompt([{
				type: 'confirm',
				name: 'drop',
				default: false,
				message: `Are you sure you want to clear the data and the meta from "${db}"? (You can't redo this action)`
			}]).then(ans1 => {
				if (!ans1.drop) {
					process.exit(0);
				}
				inquirer.prompt([{
					type: 'input',
					name: 'sum',
					message: `To permanently drop the database, please answer the result of "${num1} + ${num2}":`,
					validate: function(val) {
						return +val === num1 + num2 || 'Wrong! Please answer again'
					}
				}]).then(() => {
					mongoose.connection.db.dropDatabase(function(err) {
						mongoose.connection.close();
						if (err) {
							log('error', err);
							process.exit(1);
						}
						log('info', `Successfully drop the database "${db}"`);
						process.exit(0);
					});
				})
			});
		} else if (command === 'export') {
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
	},
	function(err) {
		log('error', 'Failed to connect database');
		log('error', err);
		process.exit(1);
	}
);
