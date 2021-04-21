// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const igCreateCall = async response => {
  const script = path.resolve(__dirname, '../scripts/igCreate.sh')
  const arg1 = `INTERNET_GATEWAY_NAME=${response.name}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return {awsIgCreateResponse: stdout, igCreateError: {awsError: stderr}}
  } catch (error) {
    return {awsIgCreateResponse: {}, igCreateError: error}
  }
}

module.exports = igCreateCall
