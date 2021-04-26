const path = require('path')
const executeProcess = require('../executeProcess')
const Conf = require('conf')
const config = new Conf()

const ecrRepoDelete = async () => {
  return executeProcess(
    'Deleting ECR Repository',
    'ECR Repository Deleted',
    () => {
      const arg1 = `REPO_NAME=fleet-ecr`
      const script = path.resolve(__dirname, '../scripts/destroy/ecrRepoDelete.sh')

      return `${arg1} ${script}`
    }
  )
}

module.exports = ecrRepoDelete