const { Command } = require('@oclif/command');
const Conf = require('conf');
const prompts = require('../prompts');
const config = new Conf();

class SetupCFCommand extends Command {
  async run() {
    const initialConfig = await prompts.welcome();
    config.set('AWS_REGION', initialConfig.awsRegion);
    
  }
}

SetupCFCommand.description = 'Create an AWS VPC using CloudFormation'
module.exports = SetupCFCommand;