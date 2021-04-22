// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const attachPolicyToRole = async policyArn => {
  return executeProcess(
    'Generating task execution role',
    'Task execution role successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/iamAttachPolicyToRole.sh')
      const arg1 = `POLICY_ARN=${policyArn}`

      return `${arg1} ${script}`
    })
}

module.exports = attachPolicyToRole
