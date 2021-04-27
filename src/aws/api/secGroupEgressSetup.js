// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const setSgEgress = async sgId => {
  return executeProcess(
    'Configuring security group egress rules',
    'Security group configured',
    () => {
      const arg1 = `SEC_GROUP_ID=${sgId}`
      const script = path.resolve(__dirname, '../scripts/secEgressSetup.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = setSgEgress
