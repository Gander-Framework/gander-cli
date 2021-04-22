// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const attachInternetGateway = async (igId, vpcId) => {
  return executeProcess(
    'Attaching internet gateway to VPC',
    'Internet gateway attached',
    () => {
      const script = path.resolve(__dirname, '../scripts/igAttach.sh')
      const arg1 = `INTERNET_GATEWAY_ID=${igId}`
      const arg2 = `VPC_ID=${vpcId}`

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = attachInternetGateway
