// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const retrieveDnsName = async albArn => {
  return executeProcess(
    'Retrieving DNS Name for ALB',
    'DNS Name retrieved',
    () => {
      const script = path.resolve(__dirname, '../scripts/dnsRetrieve.sh')
      const arg1 = `ALB_ARN=${albArn}`

      return `${arg1} ${script}`
    }
  )
}

module.exports = retrieveDnsName
