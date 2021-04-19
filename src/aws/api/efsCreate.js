// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const efsCreateCall = async response => {
  const script = path.resolve(__dirname, '../scripts/efsCreate.sh')
  const arg1 = `EFS_NAME=${response.efsName}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return {awsEfsCreateResponse: stdout, efsCreateError: {awsError: stderr}}
  } catch (error) {
    return {awsEfsCreateResponse: {}, efsCreateError: error}
  }
}

module.exports = efsCreateCall
