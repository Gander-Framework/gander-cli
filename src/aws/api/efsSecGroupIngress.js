// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const setupEfsSgIngress = async (efsSgId, vpcSgId) => {
  return executeProcess(
    'Configuring file system security group rules',
    'File system security group configured',
    () => {
      const arg1 = `EFS_SEC_GROUP_ID=${efsSgId}`
      const arg2 = `VPC_SEC_GROUP_ID=${vpcSgId}`
      const script = path.resolve(__dirname, '../scripts/efsSecGroupIngress.sh')

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = setupEfsSgIngress
