// eslint-disable-next-line unicorn/filename-case
const inquirer = require('inquirer');

const welcome = async () => {
  console.log('Welcome to Fleet-CLI! \n To help you get set up, please make sure you have your AWS credentials configured with the CLI. \n ');

  console.log('We will help you create the following resources in AWS: \n - A VPC with all necessary networking components in place \n - An Elastic File System (EFS) \n  ');

  let response = await inquirer.prompt(
    [
      {
        name: 'generateIam',
        message: 'In addition to the resources above, would you like us to generate IAM credentials for Fleet to use?',
        type: 'list',
        choices: [{ name: 'yes' }, { name: 'no' }],
      },
      {
        name: 'awsRegion',
        message: 'What AWS region would you want Fleet to operate in?',
        type: 'input',
        default: 'us-east-1',
      }
    ]
  );
  return response;
};

module.exports = welcome;
