// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const iamSetupCall = async response => {
  const script = path.resolve(__dirname, '../scripts/iamSetup.sh')
  const arg1 = `IAM_GROUP_NAME=${response.iamGroupName}`
  const arg2 = `IAM_USER_NAME=${response.iamUserName}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsIamResponse: stdout, iamError: {awsError: stderr}}
  } catch (error) {
    return {awsIamResponse: {}, iamError: error}
  }
}

module.exports = iamSetupCall
