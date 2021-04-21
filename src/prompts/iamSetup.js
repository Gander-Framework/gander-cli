/* eslint-disable unicorn/filename-case */
const inquirer = require('inquirer')

const iamSetupPrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'groupName',
    message: 'What would you like to call the IAM Group?',
    type: 'input',
  },
  {
    name: 'userName',
    message: 'What would you like to call the IAM User?',
    type: 'input',
  }])

  return response
}

module.exports = iamSetupPrompt
