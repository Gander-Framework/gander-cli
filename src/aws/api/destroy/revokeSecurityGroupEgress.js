const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const revokeSecurityGroupEgress = async (port) => {
  return executeProcess(
    'Revoking Security Group Egress Rule',
    'Security Group Egress Rules Revoked',
    () => {
      const arg1 = `DEST_GROUP_ID=${config.get('EFS_SECURITY_GROUP_ID')}`
      const arg2 = `SOURCE_GROUP_ID=${config.get('CLUSTER_SECURITY_GROUP_ID')}`
      const arg3 = `PORT=${port}`
      const script = path.resolve(__dirname, '../../scripts/destroy/revokeSecurityGroupEgress.sh')

      return `${arg1} ${arg2} ${arg3} ${script}`
    }
  )
}

module.exports = revokeSecurityGroupEgress
