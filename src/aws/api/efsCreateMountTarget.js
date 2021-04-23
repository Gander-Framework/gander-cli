// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createMountTarget = async (efsId, subnetId, efsSgId) => {
  return executeProcess(
    'Creating file system mount target',
    'Mount target created',
    () => {
      const script = path.resolve(__dirname, '../scripts/mountTargetCreate.sh')
      const arg1 = `EFS_ID=${efsId}`
      const arg2 = `SUBNET_ID=${subnetId}`
      const arg3 = `EFS_SG_ID=${efsSgId}`

      return `${arg1} ${arg2} ${arg3} ${script}`
    }
  )
}

module.exports = createMountTarget
