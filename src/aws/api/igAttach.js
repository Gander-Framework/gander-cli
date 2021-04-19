// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const igAttachCall = async (igId, vpcId) => {
  const script = path.resolve(__dirname, '../scripts/igAttach.sh')
  const arg1 = `INTERNET_GATEWAY_ID=${igId}`
  const arg2 = `VPC_ID=${vpcId}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${script}`)
    return {awsIgAttachResponse: stdout, igAttachError: {awsError: stderr}}
  } catch (error) {
    return {awsIgAttachResponse: {}, igAttachError: error}
  }
}

module.exports = igAttachCall
