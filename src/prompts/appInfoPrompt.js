const inquirer = require('inquirer');
const log = require('../util/log');

const appInfoPrompt = async () => {
  log.info('\nNow we just need a few pieces of information to finish configuring Gander in this repository');
  let response = await inquirer.prompt([{
    name: 'APP_NAME',
    message: 'What is the name of your app?',
    type: 'input',
  },
  {
    name: 'APP_SERVER_PATH',
    message: 'What is the path to your application\'s server?',
    type: 'input',
  },
  {
    name: 'DB_SETUP_PATH',
    message: 'What is the path to your database setup file? [ Must be .sql ]',
    type: 'input',
  },
  {
    name: 'DATABASE_NAME',
    message: 'What is the name of your database?',
    type: 'input',
  },
  {
    name: 'GANDER_DOMAIN',
    message: 'What is your domain? (e.g. example.com)',
    type: 'input',
  }]);
  return response;
};

module.exports = appInfoPrompt;
