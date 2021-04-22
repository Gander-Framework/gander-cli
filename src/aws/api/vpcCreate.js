// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createVpc = async response => {
  return executeProcess(
    'Creating VPC',
    'VPC successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/vpcCreate.sh')
      const arg1 = `VPC_CIDR_BLOCK=${response.cidrBlock}`
      const arg2 = `VPC_NAME=${response.name}`

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = createVpc
