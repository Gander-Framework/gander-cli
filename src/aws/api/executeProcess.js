// eslint-disable-next-line unicorn/filename-case
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fleetUtil = require('../../util')
const log = require('../../util/log.js')

const executeProcess = async (startMsg, successMsg, callback) => {
  const spinner = log.spin(startMsg)

  let awsSuccess
  try {
    const {stdout, stderr} = await exec(callback())
    awsSuccess = stdout

    if (stderr) {
      const errorStr = fleetUtil.stringifyErrorMsg(stderr)
      spinner.fail(errorStr)
      process.exit(1)
    }
  } catch (error) {
    const errorStr = fleetUtil.stringifyErrorMsg(error)
    spinner.fail(errorStr)
    process.exit(1)
  }

  spinner.succeed(successMsg)
  return awsSuccess
}

module.exports = executeProcess
