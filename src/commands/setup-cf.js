const { Command } = require('@oclif/command')
const Conf = require('conf')
class SetupCFCommand extends Command {
  async run() {
    console.log('hello!')
  }
}

SetupCFCommand.description = 'Create an AWS VPC using CloudFormation'
module.exports = SetupCFCommand;