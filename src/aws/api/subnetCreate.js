// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const subnetCreateCall = async (vpcId, response) => {
  const script = path.resolve(__dirname, '../scripts/subnetCreate.sh')
  const arg1 = `VPC_ID=${vpcId}`
  const arg2 = `SUBNET_NAME=${response.subnetName}`
  const arg3 = `AVAIL_ZONE=${response.availabilityZone}`
  const arg4 = `SUBNET_CIDR_BLOCK=${response.subnetCidrBlock}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${arg3} ${arg4} ${script}`)
    return {awsSubnetCreateResponse: stdout, subnetCreateError: {awsError: stderr}}
  } catch (error) {
    return {awsSubnetCreateResponse: {}, subnetCreateError: error}
  }
}

module.exports = subnetCreateCall
