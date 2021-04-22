// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const associateRouteTable = async (routeTableId, subnetId) => {
  return executeProcess(
    'Associating route table with subnet',
    'Route table associated',
    () => {
      const script = path.resolve(__dirname, '../scripts/routeTableAssociate.sh')
      const arg1 = `ROUTE_TABLE_ID=${routeTableId}`
      const arg2 = `SUBNET_ID=${subnetId}`

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = associateRouteTable
