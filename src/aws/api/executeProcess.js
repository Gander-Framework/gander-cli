// eslint-disable-next-line unicorn/filename-case
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const log = require('../../util/log.js')

const executeProcess = async (startMsg, successMsg, callback) => {
  const spinner = log.spin(startMsg)

  let awsSuccess
  try {
    const {stdout, stderr} = await exec(callback())
    awsSuccess = stdout

    if (stderr) {
      console.log(stderr)
      spinner.fail(stderr)
      process.exit(1)
    }
  } catch (error) {
    spinner.fail(error.stderr)
    process.exit(1)
  }

  spinner.succeed(successMsg)
  return awsSuccess
}

module.exports = executeProcess
