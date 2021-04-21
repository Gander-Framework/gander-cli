// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const efsCreateCall = async (region, response) => {
  const script = path.resolve(__dirname, '../scripts/efsCreate.sh')
  const arg1 = `EFS_NAME=${response.name}`
  const arg2 = `REGION=${region}`
  const arg3 = `CREATION_TOKEN=${response.creationToken}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${arg2} ${arg3} ${script}`)
    return {awsEfsCreateResponse: stdout, efsCreateError: {awsError: stderr}}
  } catch (error) {
    return {awsEfsCreateResponse: {}, efsCreateError: error}
  }
}

module.exports = efsCreateCall
