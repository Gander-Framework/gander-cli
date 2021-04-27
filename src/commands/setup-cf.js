const { Command } = require('@oclif/command');
const Conf = require('conf');
const api = require('../aws/api');
const prompts = require('../prompts');
const paths = require('../util/paths.js');

const config = new Conf();

class SetupCFCommand extends Command {
  async run() {
    const initialConfig = await prompts.welcome();
    config.set('AWS_REGION', initialConfig.awsRegion);

    console.log('\nGenerating your Fleet infrastructure. This may take a few minutes, so grab some coffee~ \n');
    await api.createStack('fleet-apps',paths.cloudFormationTemplatePath,initialConfig.awsRegion)
    const outputs = JSON.parse(await api.getStackOutputs('fleet-apps'))
    outputs.forEach(({OutputKey, OutputValue}) => {
      config.set(OutputKey,OutputValue)
    })
    console.log('It may take around 10 minutes for AWS to fully spin up all infrastructure pieces. \nBut for now, we\'re all done! :D')
    
    config.set('DEFAULT_SUBNET_NAME', DEFAULT_NAME)
    config.set('CLUSTER_SECURITY_GROUP', `${DEFAULT_NAME}-cluster`)
    config.set('EFS_CREATION_TOKEN', DEFAULT_NAME)
    config.set('EFS_NAME', DEFAULT_NAME)
    config.set('APP_NAMES', "[]")
  }
}

SetupCFCommand.description = 'Create an AWS VPC using CloudFormation'
module.exports = SetupCFCommand;