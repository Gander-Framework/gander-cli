const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const deleteInternetGateway = async () => {
  return executeProcess(
    'Deleting IGW',
    'IGW Deleted',
    () => {
      const arg1 = `INTERNET_GATEWAY_ID=${config.get('IGW_ID')}`
      const script = path.resolve(__dirname, '../../scripts/destroy/deleteInternetGateway.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = deleteInternetGateway

