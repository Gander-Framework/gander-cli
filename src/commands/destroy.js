const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')


class destroyCommand extends Command {
  async run() {
    // TODO: delete fleetTaskExecutionRole
    await api.iamDeleteRole()
    // TODO: delete fleetTaskExecutionPolicy
    await api.iamDeletePolicy()
    // TODO: delete mount target
    await api.deleteMountTarget()

    // TODO: delete EFS
    await api.efsDelete()

    // TODO: delete VPC resources
    await api.vpcResourcesCleanup()
    // TODO: delete VPC
    await api.vpcDelete()
    // TODO: delete cluster
    // TODO: delete ECR repo
    await api.ecrRepoDelete()
  }
}

destroyCommand.description = 'Teardown all of the Fleet infrastructure that was created during initial setup'

module.exports = DestroyCommand