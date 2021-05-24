const inquirer = require('inquirer');
const log = require('../util/log');

const PaketoBase = 'paketobuildpacks/builder:base'
const PaketoFull = 'paketobuildpacks/builder:full'
const Google = 'gcr.io/buildpacks/builder:v1'

const appNameValidator = async input => {
  if (input.match(/^[A-Za-z0-9-]+$/)) {
    return true;
  }
  return 'App name must consist only of A-Z, a-z, 0-9, and dash(-)';
};

const serverPathValidator = async input => {
  if (input.match(/\/$/)) {
    return true;
  }
  return 'Path to the directory must end with /';
};

const appInfoPrompt = async () => {
  log.header('\nNow we just need a few pieces of information to finish configuring Gander in this repository');
  let response = await inquirer.prompt([{
    name: 'APP_NAME',
    message: 'What is the name of your app?',
    type: 'input',
    validate: appNameValidator,
  },
  {
    name: 'APP_LANGUAGE',
    message: 'What is your project written in?',
    type: 'list',
    choices: [
      { name: 'Java', value: PaketoBase},
      { name: 'NodeJS', value: PaketoBase},
      { name: 'Ruby', value: PaketoFull},
      { name: 'python', value: Google},
      { name: 'golang', value: PaketoBase},
      { name: '.NET Core', value: PaketoBase},
      { name: 'PHP', value: PaketoFull},
      { name: 'Procfile', value: PaketoBase},
    ],
  },
  {
    name: 'APP_SERVER_PATH',
    message: 'What directory is your application\'s entrypoint in?',
    type: 'input',
    default: './',
    validate: serverPathValidator,
  },
  {
    name: 'STARTUP_SCRIPT',
    message: 'What is the startup script for your application?',
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
