// const createCluster = require('./ecsCreateCluster.js');
// const deleteCluster = require('./deleteCluster')
// const createStack = require('./stackCreate.js')
// const getStackOutputs = require('./getStackOutputs.js')
// const destroyStack = require('./deleteStack')
// const api = {
//   createStack,
//   getStackOutputs,
//   destroyStack,
//   createCluster,
//   deleteCluster,
// };

// module.exports = api;

const {
  CloudFormationClient,
  CreateStackCommand,
  DescribeStacksCommand,
} = require('@aws-sdk/client-cloudformation');

const executeProcess = require('./executeSdkProcess.js');

const cloudFormation = {
  client: null,
};

const initializeClient = region => new CloudFormationClient({
  region,
});

const createStack = ({ StackName, TemplateBody }) => executeProcess({
  startMsg: 'Initializing CloudFormation Stack creation',
  successMsg: 'CloudFormation Stack initialized',
  client: cloudFormation.client,
  command: new CreateStackCommand({
    Capabilities: ['CAPABILITY_NAMED_IAM'],
    StackName,
    TemplateBody,
    Parameters: [{
      ParameterKey: 'UserAWSRegion',
      ParameterValue: 'us-east-1',
    }],
  }),
});

const getStackOutputs = async ({ StackName }) => executeProcess({
  startMsg: 'Retrieving AWS resource information',
  successMsg: 'AWS resource information retrieved',
  client: cloudFormation.client,
  command: new DescribeStacksCommand({
    StackName,
  }),
  noSpinner: true,
});

module.exports = {
  cloudFormation,
  initializeClient,
  createStack,
  getStackOutputs,
};
