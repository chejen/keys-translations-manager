#!/usr/bin/env node
var chalk = require('chalk');
var yargs = require('yargs');
var argv = yargs.argv;

yargs
    .usage('Usage: $0 [locale1 (, locale2, ...)] -t [json or properties] -p [project ID] -l -o [output directory]')
    .example('$0 us-US zh-TW -t json -p p1 -o foo/bar --format')
    .demand(['t', 'p', 'o'])
    .boolean('format')
    .alias('f', 'format')
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

    .help('help')
    .argv

console.log('Output to: ', process.cwd(), chalk.bold.green(argv.output || argv.o), argv, argv.format, argv.f);
