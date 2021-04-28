const log = require('../util/log.js');
const chalk = require('chalk');

const executeProcess = async ({
  startMsg,
  successMsg,
  client,
  command,
  noSpinner,
}) => {
  let spinner;
  let awsSuccess;

  if (!noSpinner) {
    spinner = log.spin(chalk.cyan(startMsg));
  }

  try {
    const response = await client.send(command);
    awsSuccess = response;
  } catch (error) {
    if (!noSpinner) {
      spinner.fail(chalk.red.bold(`${error.name}: ${error.message}`));
    } else {
      console.log(error);
    }

    process.exit(1);
  }

  if (!noSpinner) {
    spinner.succeed(chalk.green(successMsg));
  }

  return awsSuccess;
};

module.exports = executeProcess;
