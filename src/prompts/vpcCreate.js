// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer')

const vpcCreatePrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'vpcName',
    message: 'What would you like to call your VPC?',
    type: 'input',
  },
  {
    name: 'vpcCidrBlock',
    message: 'Please specify a range of IPv4 addresses for your VPC in CIDR notation',
    type: 'input',
  }])

  return response
}

module.exports = vpcCreatePrompt
