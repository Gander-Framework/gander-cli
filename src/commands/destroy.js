const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')

class destroyCommand extends Command {
  async run() {
    // TODO: delete fleetTaskExecutionRole
    
    // TODO: delete fleetTaskExecutionPolicy
    // TODO: delete mount target
    // TODO: delete EFS
    // TODO: delete VPC
    // TODO: delete cluster
    // TODO: delete ECR repo
  }
}

destroyCommand.description = 'Teardown all of the Fleet infrastructure that was created during initial setup'

module.exports = DestroyCommand