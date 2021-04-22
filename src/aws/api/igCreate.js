// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createInternetGateway = async internetGateway => {
  return executeProcess(
    'Creating internet gateway',
    'Internet gateway succesfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/igCreate.sh')
      const arg1 = `INTERNET_GATEWAY_NAME=${internetGateway.name}`

      return `${arg1} ${script}`
    }
  )
}

module.exports = createInternetGateway
