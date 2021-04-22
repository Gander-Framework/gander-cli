// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const describeFileSystem = async efsId => {
  return executeProcess(
    'Initializing file system',
    'File system initialized',
    () => {
      const script = path.resolve(__dirname, '../scripts/efsDescribeFileSystem.sh')
      const arg1 = `EFS_ID=${efsId}`

      return `${arg1} ${script}`
    }
  )
}

module.exports = describeFileSystem
