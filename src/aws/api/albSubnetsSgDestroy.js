// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')
const Conf = require('conf')
const config = new Conf()

const destroyAlbSubnetsSg = async () => {
  return executeProcess(
    'Destroying ALB Subnets and Security Group',
    'ALB subnets and security group successfully destroyed',
    () => {
      const script = path.resolve(__dirname, '../scripts/albSubnetsSgDestroy.sh')
      const arg1 = `ALB_SUBNETA_ID=${config.get('CLUSTER_SUBNETA_ID')}`
      const arg2 = `ALB_SUBNETB_ID=${config.get('CLUSTER_SUBNETB_ID')}`
      const arg3 = `ALB_SG_ID=${config.get('ALB_SECURITY_GROUP_ID')}`

      return `${arg1} ${arg2} ${arg3} ${script}`
    }
  )
}

module.exports = destroyAlbSubnetsSg
