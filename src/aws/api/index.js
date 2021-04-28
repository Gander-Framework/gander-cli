const {
  CloudFormationClient,
  CreateStackCommand,
  DescribeStacksCommand,
  DeleteStackCommand,
} = require('@aws-sdk/client-cloudformation');
const {
  ECSClient,
  DeleteClusterCommand,
} = require('@aws-sdk/client-ecs');
const executeProcess = require('./executeSdkProcess.js');

const clients = {
  cloudFormation: null,
  ecs: null,
};

const initializeCfClient = async region => new CloudFormationClient({
  region,
});

const createStack = ({ StackName, TemplateBody }) => executeProcess({
  startMsg: 'Initializing CloudFormation Stack creation',
  successMsg: 'CloudFormation Stack initialized',
  client: clients.cloudFormation,
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
  client: clients.cloudFormation,
  command: new DescribeStacksCommand({
    StackName,
  }),
  noSpinner: true,
});

const deleteStack = async ({ StackName }) => executeProcess({
  startMsg: 'Initializing Gander stack deletion',
  successMsg: 'Gander stack is ready for deletion',
  client: clients.cloudFormation,
  command: new DeleteStackCommand({
    StackName,
  }),
});

const initializeEcsClient = async region => new ECSClient({
  region,
});

const deleteCluster = async ({ cluster }) => executeProcess({
  startMsg: `Deleting cluster ${cluster}`,
  successMsg: `${cluster} deleted`,
  client: clients.cloudFormation,
  command: new DeleteClusterCommand({
    cluster,
  }),
});

module.exports = {
  clients,
  initializeCfClient,
  initializeEcsClient,
  createStack,
  getStackOutputs,
  deleteStack,
  deleteCluster,
};
