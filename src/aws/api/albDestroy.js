// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')
const Conf = require('conf')
const config = new Conf()

const destroyAlb = async () => {
  return executeProcess(
    'Destroying application load balancer and associated resources',
    'ALB successfully destroyed',
    () => {
      const script = path.resolve(__dirname, '../scripts/albDestroy.sh')
      const arg1 = `ALB_LISTENER_ARN=${config.get('LISTENER_ARN')}`
      const arg2 = `ALB_LB_ARN=${config.get('ALB_ARN')}`
      const arg3 = `ALB_SUBNETA_ID=${config.get('CLUSTER_SUBNETA_ID')}`
      const arg4 = `ALB_SUBNETB_ID=${config.get('CLUSTER_SUBNETB_ID')}`
      const arg5 = `ALB_SG_ID=${config.get('ALB_SECURITY_GROUP_ID')}`

      return `${arg1} ${arg2} ${arg3} ${arg4} ${arg5} ${script}`
    }
  )
}

module.exports = destroyAlb
