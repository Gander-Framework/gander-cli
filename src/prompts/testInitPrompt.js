const inquirer = require('inquirer')

const testInitPrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'FOUR_EYES_SUPREMACY',
    message: 'Is team #4ize the best?',
    type: 'list',
    choices: [{name: 'yes'}, {name: 'no'}],
  }])
  return response
}

module.exports = testInitPrompt