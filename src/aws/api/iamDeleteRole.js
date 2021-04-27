const path = require('path')
const Conf = require('conf')
const executeProcess = require('./executeProcess')
const config = new Conf()

const iamDeleteRole = async () => {
  return executeProcess(
    'Deleting fleetTaskExecutionRole',
    'fleetTaskExecutionRole successfully deleted',
    () => {
      const arg1 = `ROLE_NAME=fleetTaskExecutionRole`
      const script = path.resolve(__dirname, '../scripts/iamDeleteRole.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = iamDeleteRole