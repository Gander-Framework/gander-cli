const ora = require('ora')
const chalk = require('chalk')

const primary = chalk.keyword('orange').bold
const secondary = chalk.cyan
const text = chalk.white

module.exports = {
  spin(msg, opts) {
    const spinner = ora(msg)
    spinner.color = opts?.color || 'cyan'
    return spinner.start()
  },

  headers(msg) {
    console.log(primary(msg));
  },

  info(msg) {
    console.log(secondary(msg));
  },

  text(msg) {
    console.log(text(msg));
  },
}
