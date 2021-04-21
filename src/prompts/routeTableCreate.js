// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer')

const routeTableCreatePrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'name',
    message: 'What would you like to call your routeTable?',
    type: 'input',
  }])

  return response
}

module.exports = routeTableCreatePrompt
