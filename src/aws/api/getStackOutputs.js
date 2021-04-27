// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const getStackOutputs = async (stackName) => {
  return executeProcess(
    'Getting Outputs of the Stack',
    'Outputs Retrieved',
    () => {
      const arg1 = `STACK_NAME=${stackName}`
      const script = path.resolve(__dirname, '../scripts/getStackOutputs.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = getStackOutputs
