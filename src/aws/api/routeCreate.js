// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createRoute = async (routeTableId, igId) => {
  return executeProcess(
    'Creating routes',
    'Routes successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/routeCreate.sh')
      const arg1 = `ROUTE_TABLE_ID=${routeTableId}`
      const arg2 = `INTERNET_GATEWAY_ID=${igId}`

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = createRoute
