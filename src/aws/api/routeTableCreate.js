// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createRouteTable = async (vpcId, routeTable) => {
  return executeProcess(
    'Creating route table',
    'Route table successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/routeTableCreate.sh')
      const arg1 = `VPC_ID=${vpcId}`
      const arg2 = `ROUTE_TABLE_NAME=${routeTable.name}`

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = createRouteTable
