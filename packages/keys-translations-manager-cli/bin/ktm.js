var argv = require('yargs').argv;
var chalk = require('chalk');

console.log(chalk.bold.green("output to: ") + argv.dist);
