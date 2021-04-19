// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const vpcCreateCall = async response => {
  const script = path.resolve(__dirname, '../scripts/vpcCreate.sh')
  const arg1 = `VPC_CIDR_BLOCK=${response.vpcCidrBlock}`
  const arg2 = `VPC_NAME=${response.vpcName}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsVpcCreateResponse: stdout, vpcCreateError: {awsError: stderr}}
  } catch (error) {
    return {awsVpcCreateResponse: {}, vpcCreateError: error}
  }
}

module.exports = vpcCreateCall
