const ora = require('ora')
const chalk = require('chalk')
const { LOGO, COLOR_MAP } = require('./logo')
const primary = chalk.keyword('orange').bold
const secondary = chalk.cyan
const neutral = chalk.white
const emphasis = chalk.bold.red
const success = chalk.green

const logoColorMap = {
  o: char => chalk.hex("#ef6f56")(char),
  w: char => chalk.hex("#ffffff")(char),
  g: char => chalk.hex("#89d8c5")(char),
  [' ']: char => char
}

module.exports = {
  spin(msg, opts) {
    const spinner = ora(msg)
    spinner.color = opts?.color || 'cyan'
    return spinner.start()
  },
  printLogo() {
    let logo = '';
    for (let i = 0; i < LOGO.length; i++) {
      const char = LOGO[i];
      let candidate;
      switch (COLOR_MAP[i]) {
        case 'o':
          candidate = chalk.hex("#ef6f56")(char);
          break;
        case 'g':
          candidate = chalk.hex("#89d8c5")(char);
          break;
        case 'w':
          candidate = chalk.hex("#ffffff")(char);
          break;
        default:
          candidate = char;
          break;
      }
      if(candidate === 'undefined') {
        console.log(i, LOGO[i], COLOR_MAP[i])
      }
      logo += candidate;
    }
    console.log(logo);
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

  warn(msg) {
    console.log(emphasis(msg))
  },

  primary: (msg) => primary(msg),
  secondary: (msg) => secondary(msg),
  neutral: (msg) => neutral(msg),
  emphasis: (msg) => emphasis(msg),
  success: (msg) => success(msg)
}
