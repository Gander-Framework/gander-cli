const log = require('../../util/log.js');

const executeSdkProcess = async ({
  startMsg,
  successMsg,
  client,
  command,
  noSpinner,
}) => {
  let spinner;
  let awsSuccess;

  if (!noSpinner) {
    spinner = log.spin(startMsg);
  }

  try {
    const response = await client.send(command);
    awsSuccess = response;
  } catch (error) {
    console.log('\n', error);

    if (!noSpinner) {
      spinner.fail(`${error.name}: ${error.message}`);
    }

    process.exit(1);
  }

  if (!noSpinner) {
    spinner.succeed(successMsg);
  }

  return awsSuccess;
};

module.exports = executeSdkProcess;
