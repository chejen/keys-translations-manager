'use strict';
var chalk = require('chalk');
module.exports = {
	log: function(level, msg){
		var tag;
		switch (level) {
			case 'info':
				tag = chalk.bold.green(" [INFO] ");
				break;
			case 'warn':
				tag = chalk.bold.yellow(" [WARN] ");
				break;
			case 'error':
				tag = chalk.bold.red(" [ERROR] ");
				break;
			default:
				tag = " ";
				break;
		}
		console.log(chalk.grey("  ktm") + tag + msg + "\n");
	}
};
