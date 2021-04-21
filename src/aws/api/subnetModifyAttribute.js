// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const subnetModifyAttribute = async subnetId => {
  const script = path.resolve(__dirname, '../scripts/subnetModifyAttribute.sh')
  const arg1 = `SUBNET_ID=${subnetId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return {awsSubnetModifyResponse: stdout, subnetModifyError: {awsError: stderr}}
  } catch (error) {
    return {awsSubnetModifyResponse: {}, subnetModifyError: error}
  }
}

module.exports = subnetModifyAttribute
