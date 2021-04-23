// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createSecurityGroup = async (vpcId, clusterSecurityGroup) => {
  return executeProcess(
    'Creating security group',
    'Security group successfully created',
    () => {
      const arg1 = `EC2_SEC_GROUP_NAME=${clusterSecurityGroup.name}`
      const arg2 = `EC2_SEC_GROUP_DESC="${clusterSecurityGroup.description}"`
      const arg3 = `VPC_ID="${vpcId}"`
      const script = path.resolve(__dirname, '../scripts/secGroupSetup.sh')

      return `${arg1} ${arg2} ${arg3} ${script}`
    }
  )
}

module.exports = createSecurityGroup
