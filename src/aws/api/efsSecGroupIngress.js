// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const efsSgSetupIngressCall = async (efsSgId, vpcSgId) => {
  const arg1 = `EFS_SEC_GROUP_ID=${efsSgId}`
  const arg2 = `VPC_SEC_GROUP_ID=${vpcSgId}`
  const script = path.resolve(__dirname, '../scripts/efsSecGroupIngress.sh')

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsEfsSgIngressResponse: stdout, efsSgIngressError: {awsError: stderr}}
  } catch (error) {
    return {awsEfsSgIngressResponse: {}, efsSgIngressError: error}
  }
}

module.exports = efsSgSetupIngressCall
