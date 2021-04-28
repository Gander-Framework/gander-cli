const {
  CloudFormationClient,
  CreateStackCommand
}
const path = require('path');
const executeProcess = require('./executeSdkProcess.js');

const initializeClient = (Region) => {
  return new CloudFormationClient({
  Region,
  })
}  

const createStack = async (stackName, templatePath) => {
  return executeProcess({
    startMsg: 'Creating CloudFormation Stack for Gander',
    successMsg: 'CloudFormation Stack Created',
    client,
    command: new CreateStackCommand({
      StackName,
      TemplateBody,
    })
  });
};

module.exports = {
  initializeClient,
  createStack,
}

// () => {
//   const script = path.resolve(__dirname, '../scripts/stackCreate.sh');
//   const arg1 = `STACK_NAME=${stackName}`;
//   const arg2 = `TEMPLATE_PATH=${templatePath}`;
//   const arg3 = `REGION=${region}`;

//   return `${arg1} ${arg2} ${arg3} ${script}`;
// }