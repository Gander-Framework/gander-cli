// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer')

const secGroupSetupPrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'name',
    message: 'What would you like to call the security group?',
    type: 'input',
  },
  {
    name: 'description',
    message: 'Please enter a description for the security group',
    type: 'input',
  }])

  return response
}

module.exports = secGroupSetupPrompt
