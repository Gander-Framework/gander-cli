// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer')

const efsCreatePrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'name',
    message: 'What would you like to call the Elastic File System?',
    type: 'input',
  }])

  return response
}

module.exports = efsCreatePrompt
