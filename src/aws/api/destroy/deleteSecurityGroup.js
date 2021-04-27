const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const deleteSecurityGroup = async (tag) => {
  return executeProcess(
    `Deleting ${tag} security group`,
    `${tag} security group deleted`,
    () => {
      const arg1 = tag === 'Cluster' ? 
        `SECURITY_GROUP_ID=${config.get('CLUSTER_SECURITY_GROUP_ID')}` :
        `SECURITY_GROUP_ID=${config.get('EFS_SECURITY_GROUP_ID')}`

      const script = path.resolve(__dirname, '../../scripts/destroy/deleteSecurityGroup.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = deleteSecurityGroup

