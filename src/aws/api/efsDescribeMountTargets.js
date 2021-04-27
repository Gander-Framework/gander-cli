// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const Conf = require('conf')
const config = new Conf()

const describeMountTargets = async () => {
  const script = path.resolve(__dirname, '../scripts/efsDescribeMountTargets.sh')
  const arg1 = `EFS_ID=${config.get('EFS_ID')}`

  try {
    const { stdout, stderr } = await exec(`${arg1} ${script}`)
    return stdout
  } catch (error) {
    return error.stderr
  }
}

module.exports = describeMountTargets

