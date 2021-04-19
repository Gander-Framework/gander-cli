// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const secGroupSetupCall = async (vpcId, response) => {
  const arg1 = `EC2_SEC_GROUP_NAME=${response.secGroupName}`
  const arg2 = `EC2_SEC_GROUP_DESC="${response.secGroupDesc}"`
  const arg3 = `VPC_ID="${vpcId}"`
  const script = path.resolve(__dirname, '../scripts/secGroupSetup.sh')

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${arg3} ${script}`)
    return {awsSecGroupResponse: stdout, secGroupError: {awsError: stderr}}
  } catch (error) {
    return {awsSecGroupResponse: {}, secGroupError: error}
  }
}

module.exports = secGroupSetupCall
