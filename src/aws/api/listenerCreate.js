// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createListener = async albArn => {
  return executeProcess(
    'Creating ALB Listener',
    'ALB Listener successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/listenerCreate.sh')
      const arg1 = `ALB_ARN=${albArn}`

      return `${arg1} ${script}`
    }
  )
}

module.exports = createListener
