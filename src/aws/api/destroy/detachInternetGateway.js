const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const detachInternetGateway = async () => {
  return executeProcess(
    'Detach Internet Gateway',
    'Internet Gateway Detached',
    () => {
      const arg1 = `INTERNET_GATEWAY_ID=${config.get('IGW_ID')}`
      const arg2 = `VPC_ID=${config.get('VPC_ID')}`
      const script = path.resolve(__dirname, '../../scripts/destroy/detachInternetGateway.sh')

      return `${arg1} ${arg2} ${script}`
    }
  )
}

module.exports = detachInternetGateway

