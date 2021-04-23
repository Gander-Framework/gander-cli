// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')
const Conf = require('conf')
const config = new Conf()

const deleteMountTarget = async () => {
  return executeProcess(
    'Deleting file system mount target',
    'Mount target deleted',
    () => {
      const script = path.resolve(__dirname, '../scripts/efsDeleteMountTarget.sh')
      const arg1 = `MOUNT_TARGET_ID=${config.get('MOUNT_TARGET_ID')}`


      return `${arg1} ${script}`
    }
  )
}

module.exports = deleteMountTarget
