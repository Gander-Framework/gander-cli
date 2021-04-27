const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const deleteRouteTable = async () => {
  return executeProcess(
    'Deleting Route Table',
    'Route Table Deleted',
    () => {
      const arg1 = `ROUTE_TABLE_ID=${config.get('ROUTE_TABLE_ID')}`
    
      const script = path.resolve(__dirname, '../../scripts/destroy/deleteRouteTable.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = deleteRouteTable