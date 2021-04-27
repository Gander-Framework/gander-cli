const { Command } = require('@oclif/command')
class SetupCFCommand extends Command {
  async run() {
    console.log('hello!')
  }
}

SetupCFCommand.description = 'Create an AWS VPC using CloudFormation'
module.exports = SetupCFCommand;