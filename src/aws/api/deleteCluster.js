const path = require('path')
const executeProcess = require('./executeProcess')

const deleteCluster = async (name) => {
  return executeProcess(
    `Deleting ${name} ECS cluster`,
    `${name} ECS cluster deleted`,
    () => {
      const arg1 = `CLUSTER_NAME=${name}`
      const script = path.resolve(__dirname, '../scripts/deleteCluster.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = deleteCluster

