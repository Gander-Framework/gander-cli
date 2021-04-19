// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const efsSgSetupEgressCall = async (efsSgId, vpcSgId) => {
  const arg1 = `EFS_SEC_GROUP=${efsSgId}`
  const arg2 = `VPC_SEC_GROUP=${vpcSgId}`
  const script = path.resolve(__dirname, '../scripts/secGroupEgress.sh')

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsEfsSgEgressResponse: stdout, efsSgEgressError: {awsError: stderr}}
  } catch (error) {
    return {awsEfsSgEgressResponse: {}, efsSgEgressError: error}
  }
}

module.exports = efsSgSetupEgressCall
