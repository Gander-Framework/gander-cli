const path = require('path')
const executeProcess = require('./executeProcess')
const Conf = require('conf')
const config = new Conf()

const vpcDelete = async () => {
  return executeProcess(
    'Deleting VPC',
    'VPC Deleted',
    () => {
      const arg1 = `VPC_ID=${config.get('VPC_ID')}`
      const script = path.resolve(__dirname, '../scripts/destroy/vpcDelete.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = vpcDelete
