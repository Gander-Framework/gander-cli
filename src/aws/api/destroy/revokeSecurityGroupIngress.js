const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const revokeSecurityGroupIngress = async (port) => {
  return executeProcess(
    'Revoking Security Group Ingress Rule',
    'Security Group Ingress Rules Revoked',
    () => {
      const arg1 = `RECEIVING_GROUP_ID=${config.get('EFS_SECURITY_GROUP_ID')}`
      const arg2 = `SOURCE_GROUP_ID=${config.get('CLUSTER_SECURITY_GROUP_ID')}`
      const arg3 = `PORT=${port}`
      const script = path.resolve(__dirname, '../../scripts/destroy/revokeSecurityGroupIngress.sh')

      return `${arg1} ${arg2} ${arg3} ${script}`
    }
  )
}

module.exports = revokeSecurityGroupIngress
