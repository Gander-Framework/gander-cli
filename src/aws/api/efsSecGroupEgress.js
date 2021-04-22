// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const setupEfsSgEgress = async (efsSgId, vpcSgId) => {
  return executeProcess(
    'Finalizing security group configurations',
    'Security groups finalized',
    () => {
      const arg1 = `EFS_SEC_GROUP=${efsSgId}`
      const arg2 = `VPC_SEC_GROUP=${vpcSgId}`
      const script = path.resolve(__dirname, '../scripts/secGroupEgress.sh')

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = setupEfsSgEgress
