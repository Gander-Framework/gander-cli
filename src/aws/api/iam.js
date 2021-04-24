const {
  IAMClient,
  CreateGroupCommand,
  CreateUserCommand,
  CreatePolicyCommand,
  CreateRoleCommand,
  AttachRolePolicyCommand,
} = require('@aws-sdk/client-iam');
const path = require('path');
const { fleetRootPath } = require('../../util/paths.js');
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

const loadJSON = inputPath => {
  const pathFromRoot = path.join(fleetRootPath, inputPath);
  const file = require(pathFromRoot);
  return JSON.stringify(file);
};

const client = new IAMClient({
  region: AWS_REGION,
});

const createGroup = async GroupName => executeProcess({
  startMsg: 'Creating IAM group',
  successMsg: 'IAM group successfully created',
  client,
  command: new CreateGroupCommand({ GroupName }),
});

const createUser = async UserName => executeProcess({
  startMsg: 'Creating IAM user',
  successMsg: 'IAM user successfully created',
  client,
  command: new CreateUserCommand({ UserName }),
});

const createPolicy = async (PolicyName, policyPath) => executeProcess({
  startMsg: 'Creating task execution policy',
  successMsg: 'Task execution policy successfully created',
  client,
  command: new CreatePolicyCommand({
    PolicyName,
    PolicyDocument: loadJSON(policyPath),
  }),
});

const createRole = async (RoleName, trustPath) => executeProcess({
  startMsg: 'Creating task execution role',
  successMsg: 'Task execution role successfully created',
  client,
  command: new CreateRoleCommand({
    RoleName,
    AssumeRolePolicyDocument: loadJSON(trustPath),
  }),
});

const attachRolePolicy = async (RoleName, PolicyArn) => executeProcess({
  startMsg: 'Attaching task execution policy to role',
  successMsg: 'Task execution policy successfully attached',
  client,
  command: new AttachRolePolicyCommand({
    RoleName,
    PolicyArn,
  }),
});

module.exports = {
  createGroup,
  createUser,
  createPolicy,
  createRole,
  attachRolePolicy,
};

