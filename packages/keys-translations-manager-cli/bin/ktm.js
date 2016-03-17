#!/usr/bin/env node

var chalk = require('chalk'),
	yargs = require('yargs'),
	argv = yargs.argv,
	fs = require("fs"),
	cwd = process.cwd(),
	path = require("path"),
	parts = cwd.split(path.sep),
    mongoose = require('mongoose'),
	runcom = ".ktmrc",
	loc, f, content, cfg;

while(parts.length) {
	loc = parts.join(path.sep);
	f = path.join(loc, runcom);
	if (fs.existsSync(f)) {
		console.log(chalk.bold.green(`Found config at ${f}`));
		content = fs.readFileSync(f, "utf8");
		cfg = JSON.parse(content);
		break;
	}

	parts.pop();
};
if (!cfg) {
	console.log(chalk.bold.red(`[Error] Found no ${runcom} config`));
	return;
}

/*
// ------------ test
console.log(cfg.database);
console.log(cfg.output.path.replace("${locale}", "en-US"));
console.log(cfg.output.filename);
console.log(path.join(loc, cfg.output.path.replace("${locale}", "en-US"), cfg.output.filename));return;
mongoose.connect(cfg.database, function(err) {
	if (err) {
		console.log('Failed to connect database', err);
		return;
	} else {
        var //locales = config.locales,
        	//len = locales.length,
        	schema = {
        		'key': String,

                'en-US': String,
                'zh-TW': String,

        		'project': [String]
        	},
        	TranslationSchema,
            Translations;

        //while(len--) schema[locales[len]] = String;
        TranslationSchema = new mongoose.Schema(schema);

        Translations = mongoose.model('Translation', TranslationSchema);

        var outputType = 'f'
            fileType = 'properties'
            locale = 'en-US'
            criteria = {},
            select = {
                "_id": 0,
                "key": 1
            };
        criteria[locale] = {$exists: true};
        select[locale] = 1;
        var query = Translations.find(criteria).select(select);
        if (outputType === "f") query.sort({'key':-1});

        query.exec(function(err, translations) {
            var len,
                translation,
                rootObj = {};

            if (err) console.log(err);

            len = translations.length;
            var tmp = "";
            while(len--) {
                translation = translations[len];
                tmp += translation.key + "=" + translation[locale] + "\r\n";
            }

            fs.writeFile('helloworld.txt', tmp, function (err) {
                if (err) return console.log(err);
                console.log('done !!');
            });

            mongoose.connection.close();
        });


    }
});
return; //TODO FIXME
// ------------ test
*/

yargs
	.usage('Usage: ktm <locale-1 (, locale-2, ...)> -t [json|properties] -p [project ID] -o [output directory]')
	.example('ktm us-US zh-TW -t json -p p1 -o foo/bar --format')
	//.command('download', "Download locales from a specific project.")
	.demand(['t', 'p', 'o'])
	.option('type', {
		alias: 't',
		describe: 'Provide a data type',
		choices: ['json', 'properties']
	})
	.option('project', {
		alias: 'p',
		describe: 'Provide a project ID'
	})
	.option('output', {
		alias: 'o',
		describe: 'Provide an output directory'
	})
	.boolean('format')
	.alias('f', 'format')
	.help('help')
	.alias('h', 'help')
	.argv

console.log('Output to: ', process.cwd(), chalk.bold.green(argv.output || argv.o), argv, argv.format, argv.f);
