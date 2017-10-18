'use strict';
var chalk = require('chalk');
module.exports = {
	log: function(level, msg){
		var tag;
		switch (level) {
			case 'info':
				tag = chalk.bold.green(" [INFO] ");
				break;
			/* istanbul ignore next */
			case 'warn':
				tag = chalk.bold.yellow(" [WARN] ");
				break;
			/* istanbul ignore next */
			case 'error':
				tag = chalk.bold.red(" [ERROR] ");
				break;
			/* istanbul ignore next */
			default:
				tag = " ";
				break;
		}
		console.log(chalk.grey("  ktm") + tag + msg);
	}
};
