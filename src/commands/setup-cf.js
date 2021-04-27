const { Command } = require('@oclif/command');
const Conf = require('conf');
const api = require('../aws/api');
const prompts = require('../prompts');
const paths = require('../utils/paths.js');

const config = new Conf();

class SetupCFCommand extends Command {
  async run() {
    const initialConfig = await prompts.welcome();
    config.set('AWS_REGION', initialConfig.awsRegion);

    console.log('\nGenerating your Fleet infrastructure. This may take a few minutes, so grab some coffee~ \n');
    api.createStack('fleet-apps',paths.cloudFormationTemplatePath,initialConfig.awsRegion)

    api.getStackOutputs('fleet-apps')
  }
}

SetupCFCommand.description = 'Create an AWS VPC using CloudFormation'
module.exports = SetupCFCommand;