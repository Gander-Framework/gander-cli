const path = require('path')
const executeProcess = require('./executeProcess.js')

const createStack = async (stackName, templatePath, region) => {
  return executeProcess(
    'Creating CloudFormation Stack',
    'CloudFormation Stack Created',
    () => {
      const script = path.resolve(__dirname, '../scripts/stackCreate.sh')
      const arg1 = `STACK_NAME=${stackName}`
      const arg2 = `TEMPLATE_PATH=${templatePath}`
      const arg3 = `REGION=${region}`

      return `${arg1} ${arg2} ${arg3} ${script}`
    }
  )
}

module.exports = createStack