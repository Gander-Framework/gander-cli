const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const deleteSubnet = async (tag) => {
  return executeProcess(
    `Deleting Cluster Subnet`,
    `Cluster Subnet Deleted`,
    () => {
      const arg1 = `CLUSTER_SUBNET_ID=${config.get('CLUSTER_SUBNET_ID')}`
      const script = path.resolve(__dirname, '../../scripts/destroy/deleteSubnet.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = deleteSubnet

