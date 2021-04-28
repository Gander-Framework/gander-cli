const path = require('path')
const executeProcess = require('./executeProcess')

const deleteStack = async (stackName) => {
  return executeProcess(
    `Deleting ${stackName} CloudFormation Stack`,
    `${stackName} CloudFormation Stack deleted`,
    () => {
      const arg1 = `STACK_NAME=${stackName}`
      const script = path.resolve(__dirname, '../scripts/deleteStack.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = deleteStack

