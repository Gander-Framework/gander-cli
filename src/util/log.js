const ora = require('ora')

module.exports = {
  spin(msg, opts) {
    const spinner = ora(msg)
    spinner.color = opts?.color || 'cyan'
    return spinner.start()
  },

  info(msg) {
    ora().info(msg)
  },
}
