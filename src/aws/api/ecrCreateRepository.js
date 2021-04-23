// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createEcrRepository = async () => {
  return executeProcess(
    'Creating ECR repository',
    'ECR repository successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/ecrCreateRepository.sh')

      return `${script}`
    }
  )
}

module.exports = createEcrRepository
