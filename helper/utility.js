const chalk = require('chalk');

const printSafe = (mainMessage, description = null) => {
	if (description) {
		console.log(chalk.inverse.green(mainMessage), description);
	} else {
		console.log(chalk.inverse.green(mainMessage));
	}
};
const printWarn = (mainMessage, description = null) => {
	if (description) {
		console.log(chalk.inverse.yellow(mainMessage), description);
	} else {
		console.log(chalk.inverse.yellow(mainMessage));
	}
};
const printError = (mainMessage, description = null) => {
	if (description) {
		console.error(chalk.inverse.red(mainMessage), description);
	} else {
		console.error(chalk.inverse.red(mainMessage));
	}
};

module.exports = {
	printSafe,
	printWarn,
	printError,
};
