// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const setupIam = async iam => {
  return executeProcess('Generating IAM credentials', () => {
    const script = path.resolve(__dirname, '../scripts/iamSetup.sh')
    const arg1 = `IAM_GROUP_NAME=${iam.groupName}`
    const arg2 = `IAM_USER_NAME=${iam.userName}`

    return `${arg1} ${arg2} ${script}`
  })
}

module.exports = setupIam
