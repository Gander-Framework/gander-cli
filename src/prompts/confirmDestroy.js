const inquirer = require('inquirer');
const log = require('../util/log');

const confirmDestroy = async () => {
  log.warn('This will delete all Gander code and infrastructure.');
  log.warn('It is essential to close all open pull requests before proceeding.');
  let response = await inquirer.prompt([{
    name: 'closedAllPrs',
    message: 'Have you closed all PRs in Gander repositories?',
    type: 'list',
    choices: [{ name: 'No' }, { name: 'Yes' }],
  },
  {
    name: 'iAmSure',
    message: 'Are you sure that you want to remove Gander?',
    type: 'list',
    choices: [{ name: 'No' }, { name: 'Yes, destroy Gander' }],
  }]);
  return response;
};

module.exports = confirmDestroy;
