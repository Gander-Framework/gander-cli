const log = require('../../util/log.js');

const executeSdkProcess = async ({
  startMsg,
  successMsg,
  client,
  command,
}) => {
  const spinner = log.spin(startMsg);
  let awsSuccess;

  try {
    const response = await client.send(command);
    awsSuccess = response;
  } catch (error) {
    console.log('\n', error);
    spinner.fail(`${error.name}: ${error.message}`);
    process.exit(1);
  }

  // return client.send(command)
  // .then(response => {
  //   spinner.succeed(successMsg);
  //   return response;
  // })
  // .catch(error => {
  //   console.log('HIT ME');
  //   console.log('\n', error);
  //   spinner.fail(`${error.name}: ${error.message}`);
  //   process.exit(1);
  // });

  spinner.succeed(successMsg);

  return awsSuccess;
};

module.exports = executeSdkProcess;
