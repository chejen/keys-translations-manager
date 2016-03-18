#!/usr/bin/env node

var chalk = require('chalk'),
	yargs = require('yargs'),
	argv = yargs.argv,
	fs = require('node-fs'),
	cwd = process.cwd(),
	path = require('path'),
	parts = cwd.split(path.sep),
    mongoose = require('mongoose'),
    Properties2Json = require('../lib/Properties2Json.js'),
	runcom = ".ktmrc",
	loc, f, content, cfg;

while(parts.length) {
	loc = parts.join(path.sep);
	f = path.join(loc, runcom);
	if (fs.existsSync(f)) {
		console.log(chalk.green(`Found config at ${f}`));
		content = fs.readFileSync(f, "utf8");
		cfg = JSON.parse(content);
		break;
	}

	parts.pop();
};
if (!cfg) {
	console.log(chalk.red(`[Error] Found no ${runcom} config`));
	return;
}

yargs
	.usage('Usage: ktm [locale1 (, locale2, ...)] -t [json|properties] -p [project ID] -o [output directory]')
	.example('ktm us-US zh-TW -t json -p p1 --format')
	//.command('download', "Download locales from a specific project.")
	.demand(['t', 'p'/*, 'o'*/])
	.option('type', {
		alias: 't',
		describe: 'Provide a data type',
		choices: ['json', 'properties']
	})
	.option('project', {
		alias: 'p',
		describe: 'Provide a project ID'
	})
	/*.option('output', {
		alias: 'o',
		describe: 'Provide an output directory'
	})*/
	.boolean('format')
	.alias('f', 'format')
	.help('help')
	.alias('h', 'help')
	.argv

console.log(argv, argv._);
console.log(cfg.output.path.replace("${locale}", "en-US"));
console.log(cfg.output.filename);
//console.log(path.join(loc, cfg.output.path.replace("${locale}", "en-US"), cfg.output.filename));
mongoose.connect(cfg.database, function(err) {
	if (err) {
        console.log(chalk.red('Failed to connect database !'));
        console.log(chalk.red(err));
	} else {
        var locales = argv._,
            lenLocales = locales.length,
        	schema = {
        		'key': String,
        		'project': [String]
        	},
        	TranslationSchema,
            Translations,
            count = 0;

        while(lenLocales--) schema[locales[lenLocales]] = String;
        TranslationSchema = new mongoose.Schema(schema);
        Translations = mongoose.model('Translation', TranslationSchema);


        locales.forEach(function(locale){
            var filePath = path.join(loc, cfg.output.path.replace("${locale}", locale)),
				file = path.join(filePath, cfg.output.filename),
                outputType = argv.format ? 'f' : '',
                fileType = argv.t || argv.type,
                project = argv.p || argv.project,
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
            if (outputType === "f") query.sort({'key':-1});
            query.exec(function(err, translations) {
                var len,
                    translation,
                    rootObj = {},
                    str = "";

                if (err) {
                    mongoose.connection.close();
                    console.log(chalk.red(err));
                    return;
                }

                len = translations.length;

                if (fileType === "json") {
                    while(len--) {
                        translation = translations[len];
                        Properties2Json(rootObj, translation.key, translation[locale]);
                    }

                    if (outputType === "f") { //formatted
                        str = JSON.stringify(rootObj, null, 2)
                    } else { //minimized
                        str = JSON.stringify(rootObj);
                    }

                } else if (fileType === "properties") {
                    while(len--) {
                        translation = translations[len];
                        str += translation.key + "=" + translation[locale] + "\r\n";
                    }
                }

                fs.writeFile(file, str, function (err) {
                    if (err) {
                        if (err.code === 'ENOENT'){
							fs.mkdir(filePath, 0777, true, function (err) {
								if (err) {
									mongoose.connection.close();
			                        console.log(chalk.red(err));
								} else {
									console.log(chalk.green(filePath + ' created.'));
									fs.writeFile(file, str, function (err) {
										if (err) {
											mongoose.connection.close();
					                        console.log(chalk.red(err));
										} else {
											console.log(chalk.green('Successfully output to: ' + file));
										}
									});
								}
							});
						} else {
							mongoose.connection.close();
	                        console.log(chalk.red(err));
						}
                    } else {
                    	console.log(chalk.green('Successfully output to: ' + file));
					}
                });

                if (++count === locales.length) {
                    mongoose.connection.close();
                }
            });
        });

    }
});
