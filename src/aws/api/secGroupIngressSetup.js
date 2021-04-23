// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const setSgIngress = async sgId => {
  return executeProcess(
    'Configuring security group rules',
    'Security group configured',
    () => {
      const arg1 = `SEC_GROUP_ID=${sgId}`
      const script = path.resolve(__dirname, '../scripts/secIngressSetup.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = setSgIngress
