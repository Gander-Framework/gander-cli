const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')
const utils = require('../util')
const log = require('../util/log')
const Conf = require('conf')
const config = new Conf()


const destroyAllClusters = () => {
  const appNames = JSON.parse(config.get('APP_NAMES'))
  appNames.forEach(name => {
    // TODO: call api.deleteCluster
    api.deleteCluster(name)
  })
}

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
    const pollSpinner = log.spin('Deleting Mount Target')
    while(!mountTargetDeleted) {
      utils.sleep(500)
      const describeMountTargetsResponse = await api.describeMountTargets()
      const mtLength = JSON.parse(describeMountTargetsResponse).MountTargets.length
      mountTargetDeleted = mtLength === 0 ? true : false
    }
    pollSpinner.succeed('Mount Target deleted')

    
    
    // TODO: delete EFS
    await api.efsDelete()

    // TODO: delete ECR repo
    await api.ecrRepoDelete()

    // VPC Dependency Journey -----------------------
    await api.disassociateRouteTable()
    await api.deleteRouteTable()
    
    await api.detachInternetGateway()
    await api.deleteInternetGateway()
    await api.deleteSubnet()
    

    // TODO: revoke ingress rule on EFS on port 2049 coming from Cluster SG
    await api.revokeSecurityGroupIngress(2049)
    // TODO: revoke egress rule on Cluster, port 2049, going to EFS SG
    await api.revokeSecurityGroupEgress(2049)
    
    await api.deleteSecurityGroup('Cluster')
    await api.deleteSecurityGroup('EFS')
   
    // TODO: delete VPC
    await api.vpcDelete()
    
    // TODO: delete clusters
    destroyAllClusters()
    
  }
}

DestroyCommand.description = 'Teardown all of the Fleet infrastructure that was created during initial setup'

module.exports = DestroyCommand