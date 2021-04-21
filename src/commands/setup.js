const {Command} = require('@oclif/command')
const autoConfiguredCliFlow = require('../cliFlows/autoConfigured.js')
const userConfiguredCliFlow = require('../cliFlows/userConfigured.js')
const prompts = require('../prompts')
const utils = require('../util')

class SetupCommand extends Command {
  async run() {
    let aws = utils.readConfig()
    const initialConfig = await prompts.welcome()

    aws.efs.region = initialConfig.awsRegion
    aws.subnet.availabilityZone = `${initialConfig.awsRegion}a`
    /*
    if (initialConfig.autoConfigure === 'Configure myself') {
      aws = await userConfiguredCliFlow(aws, initialConfig.generateIam)
    } else {
      aws = await autoConfiguredCliFlow(aws, initialConfig.generateIam)
    } */

    const {path} = await prompts.saveConfig()
    utils.writeConfig(aws, path)
    console.log('All done! :D')
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
