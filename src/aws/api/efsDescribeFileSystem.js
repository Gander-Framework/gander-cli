// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const describeFileSystem = async efsId => {
  const script = path.resolve(__dirname, '../scripts/efsDescribeFileSystem.sh')
  const arg1 = `EFS_ID=${efsId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return stdout
  } catch (error) {
    return error.stderr
  }
}

module.exports = describeFileSystem
