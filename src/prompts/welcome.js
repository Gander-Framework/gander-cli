// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer');
const log = require('../util/log');

const welcome = async () => {
  log.printLogo()
  log.header('Welcome to Gander-CLI!');

  log.text('\nTo help you get set up, please make sure you have your AWS credentials configured with the CLI.\n');

  let response = await inquirer.prompt([
  {
    name: 'awsRegion',
    message: 'What AWS region do you want Gander to operate in?',
    type: 'input',
    default: 'us-east-1',
  }]);
  return response;
};

module.exports = welcome;
