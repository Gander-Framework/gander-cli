// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const efsCreateMountTargetCall = async (efsId, subnetId, efsSgId) => {
  const script = path.resolve(__dirname, '../scripts/mountTargetCreate.sh')
  const arg1 = `EFS_ID=${efsId}`
  const arg2 = `SUBNET_ID=${subnetId}`
  const arg3 = `EFS_SG_ID=${efsSgId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${arg3} ${script}`)
    return {awsMountTargetResponse: stdout, mountTargetError: {awsError: stderr}}
  } catch (error) {
    return {awsMountTargetResponse: {}, mountTargetError: error}
  }
}

module.exports = efsCreateMountTargetCall
