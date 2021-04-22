// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createEfs = async (region, response) => {
  return executeProcess(
    'Creating elastic file system',
    'File system successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/efsCreate.sh')
      const arg1 = `EFS_NAME=${response.name}`
      const arg2 = `REGION=${region}`
      const arg3 = `CREATION_TOKEN=${response.creationToken}`

      return `${arg1} ${arg2} ${arg3} ${script}`
    }
  )
}

module.exports = createEfs
