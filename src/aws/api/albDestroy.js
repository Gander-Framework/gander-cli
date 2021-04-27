// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')
const Conf = require('conf')
const config = new Conf()

const destroyAlb = async () => {
  return executeProcess(
    'Destroying application load balancer and listener',
    'ALB and listener deleted',
    () => {
      const script = path.resolve(__dirname, '../scripts/albDestroy.sh')
      const arg1 = `ALB_LISTENER_ARN=${config.get('LISTENER_ARN')}`
      const arg2 = `ALB_LB_ARN=${config.get('ALB_ARN')}`

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = destroyAlb
