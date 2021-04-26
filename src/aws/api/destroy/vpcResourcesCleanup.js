const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const vpcResourcesCleanup = async () => {
  return executeProcess(
    'Deleting VPC resources',
    'VPC Resources Deleted',
    () => {
      const arg1 = `ASSOCIATION_ID=${config.get('ASSOCIATION_ID')}`
      const arg2 = `ROUTE_TABLE_ID=${config.get('ROUTE_TABLE_ID')}`
      const arg3 = `INTERNET_GATEWAY_ID=${config.get('IGW_ID')}`
      const arg4 = `VPC_ID=${config.get('VPC_ID')}`
      const arg5 = `SUBNET_ID=${config.get('CLUSTER_SUBNET_ID')}`
      const script = path.resolve(__dirname, '../../scripts/destroy/vpcDelete.sh')

      return `${arg1} ${arg2} ${arg3} ${arg4} ${arg5} ${script}`
    }
  )
}

module.exports = vpcResourcesCleanup

