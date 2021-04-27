const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const iamDetachPolicyRole = async () => {
  return executeProcess(
    'Detaching IAM Policy',
    'IAM Policy Detached',
    () => {
      const arg1 = `POLICY_ARN=${config.get('POLICY_ARN')}`
      const arg2 = `ROLE_NAME=fleetTaskExecutionRole`
      const script = path.resolve(__dirname, '../../scripts/destroy/iamDetachPolicyRole.sh')

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = iamDetachPolicyRole