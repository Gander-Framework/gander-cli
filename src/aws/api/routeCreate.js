// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const routeCreateCall = async (routeTableId, igId) => {
  const script = path.resolve(__dirname, '../scripts/routeCreate.sh')
  const arg1 = `ROUTE_TABLE_ID=${routeTableId}`
  const arg2 = `INTERNET_GATEWAY_ID=${igId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsRouteCreateResponse: stdout, routeCreateError: {awsError: stderr}}
  } catch (error) {
    return {awsRouteCreateResponse: {}, routeCreateError: error}
  }
}

module.exports = routeCreateCall
