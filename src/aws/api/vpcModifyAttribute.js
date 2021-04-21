// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const vpcModifyAttribute = async vpcId => {
  const script = path.resolve(__dirname, '../scripts/vpcModifyAttribute.sh')
  const arg1 = `VPC_ID=${vpcId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return {awsVpcModifyResponse: stdout, vpcModifyError: {awsError: stderr}}
  } catch (error) {
    return {awsVpcModifyResponse: {}, vpcModifyError: error}
  }
}

module.exports = vpcModifyAttribute
