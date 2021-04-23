const path = require('path')
const exec = util.promisify(require('child_process').exec)
const Conf = require('conf')
const config = new Conf()

const iamDeletePolicy = async () => {
  return executeProcess(
    'Deleting fleetTaskExecution Policy',
    'fleetTaskExecution Policy successfully deleted',
    () => {
      const arg1 = `POLICY_ARN=${config.get('POLICY_ARN')}`
      const script = path.resolve(__dirname, '../scripts/iamDeletePolicy.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = iamDeletePolicy