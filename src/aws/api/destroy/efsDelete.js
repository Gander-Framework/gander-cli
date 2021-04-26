const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const efsDelete = async () => {
  return executeProcess(
    'Deleting EFS',
    'EFS Deleted',
    () => {
      const arg1 = `EFS_ID=${config.get('EFS_ID')}`
      const script = path.resolve(__dirname, '../../scripts/destroy/efsDelete.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = efsDelete
