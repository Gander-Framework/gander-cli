const {
  IAMClient,
  CreateGroupCommand,
  CreateUserCommand,
} = require('@aws-sdk/client-iam');
const log = require('../../util/log.js');

const executeProcess = async ({
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
    spinner.fail(`${error.name}: ${error.message}`);
    process.exit(1);
  }

  spinner.succeed(successMsg);
  return awsSuccess;
};

const AWS_REGION = 'us-east-1';
const client = new IAMClient({
  region: AWS_REGION,
});

const createGroup = async params => executeProcess({
  startMsg: 'Creating IAM group',
  successMsg: 'IAM group successfully created',
  client,
  command: new CreateGroupCommand(params),
});

const createUser = async params => executeProcess({
  startMsg: 'Creating IAM user',
  successMsg: 'IAM user successfully created',
  client,
  command: new CreateUserCommand(params),
});

module.exports = {
  createGroup,
  createUser,
};

