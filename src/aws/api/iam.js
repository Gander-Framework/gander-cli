const {
  IAMClient,
  CreateGroupCommand,
  CreateUserCommand,
  CreatePolicyCommand,
  CreateRoleCommand,
  AttachRolePolicyCommand,
} = require('@aws-sdk/client-iam');

const client = require('./client.js');
const executeProcess = require('./executeSdkProcess.js');
const ganderUtils = require('../../util');

const initializeClient = region => {
  return new IAMClient({
    region,
  });
};

const createGroup = async ({ GroupName }) => executeProcess({
  startMsg: 'Creating IAM group',
  successMsg: 'IAM group successfully created',
  client: client.iam,
  command: new CreateGroupCommand({ GroupName }),
});

const createUser = async ({ UserName }) => executeProcess({
  startMsg: 'Creating IAM user',
  successMsg: 'IAM user successfully created',
  client: client.iam,
  command: new CreateUserCommand({ UserName }),
});

const createPolicy = async ({ PolicyName, PolicyPath }) => executeProcess({
  startMsg: 'Creating task execution policy',
  successMsg: 'Task execution policy successfully created',
  client: client.iam,
  command: new CreatePolicyCommand({
    PolicyName,
    PolicyDocument: ganderUtils.loadJson(PolicyPath),
  }),
});

const createRole = async ({ RoleName, TrustPath }) => executeProcess({
  startMsg: 'Creating task execution role',
  successMsg: 'Task execution role successfully created',
  client: client.iam,
  command: new CreateRoleCommand({
    RoleName,
    AssumeRolePolicyDocument: ganderUtils.loadJson(TrustPath),
  }),
});

const attachRolePolicy = async ({ RoleName, PolicyArn }) => executeProcess({
  startMsg: 'Attaching task execution policy to role',
  successMsg: 'Task execution policy successfully attached',
  client: client.iam,
  command: new AttachRolePolicyCommand({
    RoleName,
    PolicyArn,
  }),
});

module.exports = {
  initializeClient,
  createGroup,
  createUser,
  createPolicy,
  createRole,
  attachRolePolicy,
};

