// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer')

const igCreatePrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'igName',
    message: 'What would you like to call your internet gateway?',
    type: 'input',
  }])

  return response
}

module.exports = igCreatePrompt
