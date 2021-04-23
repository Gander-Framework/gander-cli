// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const Conf = require('conf')
const config = new Conf()

const ecsCreateCluster = async () => {
  const script = path.resolve(__dirname, '../scripts/ecsCreateCluster.sh')
  const arg1 = `CLUSTER_NAME=${config.get('APP_NAME')}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return {ecsCreateClusterResponse: stdout, ecsCreateClusterError: {awsError: stderr}}
  } catch (error) {
    return {ecsCreateClusterResponse: {}, ecsCreateCluster: error}
  }
}

module.exports = ecsCreateCluster
