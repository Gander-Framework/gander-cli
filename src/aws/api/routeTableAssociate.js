// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const routeTableAssociateCall = async (routeTableId, subnetId) => {
  const script = path.resolve(__dirname, '../scripts/routeTableAssociate.sh')
  const arg1 = `ROUTE_TABLE_ID=${routeTableId}`
  const arg2 = `SUBNET_ID=${subnetId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsRouteTableAssociateResponse: stdout, routeTableAssociateError: {awsError: stderr}}
  } catch (error) {
    return {awsRouteTableAssociateResponse: {}, routeTableAssociateError: error}
  }
}

module.exports = routeTableAssociateCall
