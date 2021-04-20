// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const efsDescribeFileSystem = async efsId => {
  const script = path.resolve(__dirname, '../scripts/efsDescribeFileSystem.sh')
  const arg1 = `EFS_ID=${efsId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return {awsEfsDescribeResponse: stdout, efsDesribeError: {awsError: stderr}}
  } catch (error) {
    return {awsEfsDescribeResponse: {}, efsDescribeError: error}
  }
}

module.exports = efsDescribeFileSystem
