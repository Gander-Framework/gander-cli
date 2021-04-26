const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')
const utils = require('../util')


class DestroyCommand extends Command {
  async run() {
    
    await api.iamDetachPolicyRole()
    // TODO: delete fleetTaskExecutionRole
    await api.iamDeleteRole()
    // TODO: delete fleetTaskExecutionPolicy
    await api.iamDeletePolicy()
    // TODO: delete mount target
    await api.deleteMountTarget()


    let mountTargetDeleted = false;
    const pollSpinner
    while(!mountTargetDeleted) {
      utils.sleep(500)
      const describeMountTargetsResponse = await api.describeMountTargets()
      const mtLength = JSON.parse(describeMountTargetsResponse).MountTargets.length
      mountTargetDeleted = mtLength === 0 ? true : false
    }

    
    
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

DestroyCommand.description = 'Teardown all of the Fleet infrastructure that was created during initial setup'

module.exports = DestroyCommand