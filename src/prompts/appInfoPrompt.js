const inquirer = require('inquirer')

const appInfoPrompt = async () => {
  let response = await inquirer.prompt([{
    name: 'APP_NAME',
    message: 'What is the name of your app?',
    type: 'input',
  },
  {
    name: 'APP_SERVER_PATH',
    message: 'What is the path to your application\'s server?',
    type: 'input'    
  },
  {
    name: 'DB_SETUP_PATH',
    message: 'What is the path to your database setup file? [ Must be .sql ]',
    type: 'input'
  },
  {
    name: 'DATABASE_NAME',
    message: 'What is the name of your database?',
    type: 'input'
  }])
  return response
}

module.exports = appInfoPrompt