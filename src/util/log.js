const ora = require('ora')
const chalk = require('chalk')

const primary = chalk.keyword('orange').bold
const secondary = chalk.cyan
const neutral = chalk.white
const emphasis = chalk.bold.red
const success = chalk.green

module.exports = {
  spin(msg, opts) {
    const spinner = ora(msg)
    spinner.color = opts?.color || 'cyan'
    return spinner.start()
  },

  header(msg) {
    console.log(primary(msg));
  },

  info(msg) {
    console.log(secondary(msg));
  },

  text(msg) {
    console.log(neutral(msg));
  },

  error(msg) {
    console.log(emphasis(msg))
  },

  primary: (msg) => primary(msg),
  secondary: (msg) => secondary(msg),
  neutral: (msg) => neutral(msg),
  emphasis: (msg) => emphasis(msg),
  success: (msg) => success(msg)
}
