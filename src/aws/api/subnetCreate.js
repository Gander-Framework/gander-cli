// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createSubnet = async (vpcId, subnet) => {
  return executeProcess(
    'Creating subnet',
    'Subnet successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/subnetCreate.sh')
      const arg1 = `VPC_ID=${vpcId}`
      const arg2 = `SUBNET_NAME=${subnet.name}`
      const arg3 = `AVAIL_ZONE=${subnet.availabilityZone}`
      const arg4 = `SUBNET_CIDR_BLOCK=${subnet.cidrBlock}`

      return `${arg1} ${arg2} ${arg3} ${arg4} ${script}`
    }
  )
}

module.exports = createSubnet
