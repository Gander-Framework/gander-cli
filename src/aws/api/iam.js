const {
  IAMClient,
  CreateGroupCommand,
  CreateUserCommand,
  CreatePolicyCommand,
  CreateRoleCommand,
  AttachRolePolicyCommand,
} = require('@aws-sdk/client-iam');

const executeProcess = require('./executeSdkProcess.js');
const { loadJSON } = require('../../util');

// TODO: pull region from config file
const AWS_REGION = 'us-east-1';

const client = new IAMClient({
  region: AWS_REGION,
});

const createGroup = async ({ GroupName }) => executeProcess({
  startMsg: 'Creating IAM group',
  successMsg: 'IAM group successfully created',
  client,
  command: new CreateGroupCommand({ GroupName }),
});

const createUser = async ({ UserName }) => executeProcess({
  startMsg: 'Creating IAM user',
  successMsg: 'IAM user successfully created',
  client,
  command: new CreateUserCommand({ UserName }),
});

const createPolicy = async ({ PolicyName, PolicyPath }) => executeProcess({
  startMsg: 'Creating task execution policy',
  successMsg: 'Task execution policy successfully created',
  client,
  command: new CreatePolicyCommand({
    PolicyName,
    PolicyDocument: loadJSON(PolicyPath),
  }),
});

const createRole = async ({ RoleName, TrustPath }) => executeProcess({
  startMsg: 'Creating task execution role',
  successMsg: 'Task execution role successfully created',
  client,
  command: new CreateRoleCommand({
    RoleName,
    AssumeRolePolicyDocument: loadJSON(TrustPath),
  }),
});

const attachRolePolicy = async ({ RoleName, PolicyArn }) => executeProcess({
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

