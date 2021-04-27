const {
  ECRClient,
  CreateRepositoryCommand,
} = require('@aws-sdk/client-ecr');

const client = require('./client.js');
const executeProcess = require('./executeSdkProcess.js');

const initializeClient = region => {
  return new ECRClient({
    region,
  });
};

const createRepository = () => executeProcess({
  startMsg: 'Creating ECR repository',
  successMsg: 'ECR repository successfully created',
  client: client.ecr,
  command: new CreateRepositoryCommand({
    repositoryName: 'fleet-ecr',
  }),
});

module.exports = {
  initializeClient,
  createRepository,
};
