const {Command} = require('@oclif/command')
const autoConfiguredCliFlow = require('../flows/autoConfigured.js')
const userConfiguredCliFlow = require('../flows/userConfigured.js')
const prompts = require('../prompts')
const utils = require('../util')
const Conf = require('conf')
const config = new Conf()

const DEFAULT_NAME = 'fleet-apps'

class SetupCommand extends Command {
  async run() {
    let aws = utils.readConfig()
    const initialConfig = await prompts.welcome()

    aws.efs.region = initialConfig.awsRegion
    config.set('AWS_REGION', initialConfig.awsRegion)

    aws.subnet.availabilityZone = `${initialConfig.awsRegion}a`

    if (initialConfig.autoConfigure === 'Configure myself') {
      aws = await userConfiguredCliFlow(aws, initialConfig.generateIam)
    } else {
      aws = await autoConfiguredCliFlow(aws, initialConfig.generateIam)
    }

    const {path} = await prompts.saveConfig()
    utils.writeConfig(aws, path)

    config.set('DEFAULT_SUBNET_NAME', DEFAULT_NAME)
    config.set('CLUSTER_SECURITY_GROUP', DEFAULT_NAME)
    config.set('EFS_CREATION_TOKEN', DEFAULT_NAME)

    console.log('All done! :D')
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
