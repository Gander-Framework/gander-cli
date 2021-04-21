// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer')

const subnetCreatePrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'name',
    message: 'What would you like to call your subnet?',
    type: 'input',
  },
  {
    name: 'availabilityZone',
    message: 'Which AWS Availability Zone would you like your subnet to exist in?',
    type: 'input',
  },
  {
    name: 'cidrBlock',
    message: 'Please specify a range of IPv4 addresses for your subnet in CIDR notation',
    type: 'input',
  }])

  return response
}

module.exports = subnetCreatePrompt
