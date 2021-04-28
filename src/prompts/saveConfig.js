// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer');

const saveConfig = async () => {
  console.log('Your AWS infrastructure is ready for your flock of Gander review apps! \n ');

  let response = await inquirer.prompt([{
    name: 'path',
    message: 'Where would you like to save \'gander-infrastructure.yaml\', a file with your resource configurations and IDs? Please enter an exact path. ',
    type: 'input',
  }]);

  return response;
};

module.exports = saveConfig;
