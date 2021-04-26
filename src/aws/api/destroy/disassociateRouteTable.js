const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const vpcResourcesCleanup = async () => {
  return executeProcess(
    'Disassociating Route Table',
    'Route Table Disassociated',
    () => {
      const arg1 = `ASSOCIATION_ID=${config.get('ASSOCIATION_ID')}`
    
      const script = path.resolve(__dirname, '../../scripts/destroy/disassociateRouteTable.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = vpcResourcesCleanup
