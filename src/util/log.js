const ora = require('ora')
const chalk = require('chalk')

module.exports = {
  spin(msg, opts) {
    const spinner = ora(msg)
    spinner.color = opts?.color || 'cyan'
    return spinner.start()
  },

  info(msg) {
    console.log(chalk.keyword('orange').bold(msg));
  },
}
