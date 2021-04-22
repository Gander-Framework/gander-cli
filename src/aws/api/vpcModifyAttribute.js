// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const modifyVpcAttribute = async vpcId => {
  return executeProcess(
    'Configuring VPC',
    'VPC configured',
    () => {
      const script = path.resolve(__dirname, '../scripts/vpcModifyAttribute.sh')
      const arg1 = `VPC_ID=${vpcId}`

      return `${arg1} ${script}`
    }
  )
}

module.exports = modifyVpcAttribute
