// eslint-disable-next-line unicorn/filename-case
const path = require('path');
const { fleetRootPath } = require('../../util/paths.js');
const executeProcess = require('./executeProcess.js');

const createPolicy = async () => {
  return executeProcess(
    'Generating task execution policy',
    'Task execution policy successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/iamCreatePolicy.sh');
      const policyPath = path.join(fleetRootPath, '/templates/iamPolicies/taskExecutionPolicy.json');

      const arg1 = `POLICY_PATH=${policyPath}`;

      return `${arg1} ${script}`;
    });
};

module.exports = createPolicy;
