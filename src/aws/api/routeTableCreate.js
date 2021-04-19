// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const routeTableCreateCall = async (vpcId, response) => {
  const script = path.resolve(__dirname, '../scripts/routeTableCreate.sh')
  const arg1 = `VPC_ID=${vpcId}`
  const arg2 = `ROUTE_TABLE_NAME=${response.routeTableName}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsRouteTableCreateResponse: stdout, routeTableCreateError: {awsError: stderr}}
  } catch (error) {
    return {awsRouteTableCreateResponse: {}, routeTableCreateError: error}
  }
}

module.exports = routeTableCreateCall
