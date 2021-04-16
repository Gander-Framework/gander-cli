// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const sgSetupIngressCall = async sgId => {
  const arg1 = `SEC_GROUP_ID=${sgId}`
  const script = path.resolve(__dirname, '../scripts/secIngressSetup.sh')

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return {awsSGIngressResponse: stdout, sgIngressError: {awsError: stderr}}
  } catch (error) {
    return {awsSGIngressResponse: {}, SGIngressError: error}
  }
}

module.exports = sgSetupIngressCall
