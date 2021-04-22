// eslint-disable-next-line unicorn/filename-case
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const log = require('../../util/log.js')

const executeProcess = async (startMsg, successMsg, callback) => {
  const spinner = log.spin(startMsg)

  try {
    const {stdout, stderr} = await exec(callback())
    if (stderr) {
      spinner.fail(stderr)
      process.exit(1)
    }
  } catch (error) {
    spinner.fail(error)
    process.exit(1)
  }

  spinner.succeed(successMsg)
}

module.exports = executeProcess
