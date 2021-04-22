// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const modifySubnetAttribute = async subnetId => {
  return executeProcess(
    'Configuring subnet',
    'Subnet configured',
    () => {
      const script = path.resolve(__dirname, '../scripts/subnetModifyAttribute.sh')
      const arg1 = `SUBNET_ID=${subnetId}`

      return `${arg1} ${script}`
    }
  )
}

module.exports = modifySubnetAttribute
