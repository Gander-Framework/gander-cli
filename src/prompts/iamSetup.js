/* eslint-disable unicorn/filename-case */
const inquirer = require('inquirer')

const iamSetupPrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'iam',
    message: 'Would you like us to generate IAM credentials for you?',
    type: 'list',
    choices: [{name: 'yes'}, {name: 'no'}],
  }])
  const setupIam = response.iam

  if (setupIam === 'yes') {
    response = await inquirer.prompt([{
      name: 'iamGroupName',
      message: 'What would you like to call the IAM Group?',
      type: 'input',
    },
    {
      name: 'iamUserName',
      message: 'What would you like to call the IAM User?',
      type: 'input',
    }])

    response.iam = setupIam

    return response
  }

  console.log('Please make sure you have the correct IAM permissions to create the required resources. See blah blah blah for permission requirements. \n')

  return response
}

module.exports = iamSetupPrompt
