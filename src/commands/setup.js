const {Command} = require('@oclif/command')
const api = require('../aws/api')
const prompts = require('../prompts')
const utils = require('../util')
const log = require('../util/log.js')

class SetupCommand extends Command {
  async run() {
    let aws = utils.readConfig()
    const initialConfig = await prompts.welcome()

    aws.region = initialConfig.awsRegion
    aws.efs.region = initialConfig.awsRegion
    aws.subnet.availabilityZone = `${initialConfig.awsRegion}a`

    console.log('\n Generating your Fleet infrastructure. This may take a few minutes, so grab some coffee~ \n')

    if (initialConfig.generateIam === 'yes') {
      await api.setupIam(aws.iam)
    } else {
      aws.iam = null
    }

    // Create and configure VPC
    const createVpcResponse = await api.createVpc(aws.vpc)
    aws.vpc.id = JSON.parse(createVpcResponse).Vpc.VpcId
    await api.modifyVpcAttribute(aws.vpc.id)

    // Create security groups and rules
    const clusterSecurityGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.clusterSecurityGroup)
    aws.clusterSecurityGroup.id = JSON.parse(clusterSecurityGroupResponse).GroupId
    await api.setSgIngress(aws.clusterSecurityGroup.id)

    // Create and configure subnet
    const createSubnetResponse = await api.createSubnet(aws.vpc.id, aws.subnet)
    aws.subnet.id = JSON.parse(createSubnetResponse).Subnet.SubnetId
    await api.modifySubnetAttribute(aws.subnet.id)

    // Create and attach internet gateway
    const createInternetGatewayResponse = await api.createInternetGateway(aws.internetGateway)
    aws.internetGateway.id = JSON.parse(createInternetGatewayResponse).InternetGateway.InternetGatewayId
    await api.attachInternetGateway(aws.internetGateway.id, aws.vpc.id)

    // Create route table
    const createRouteTableResponse = await api.createRouteTable(aws.vpc.id, aws.routeTable)
    aws.routeTable.id = JSON.parse(createRouteTableResponse).RouteTable.RouteTableId

    // Create route
    await api.createRoute(aws.routeTable.id, aws.internetGateway.id)

    // Associate route table
    await api.associateRouteTable(aws.routeTable.id, aws.subnet.id)

    // Create EFS security group and rules
    const createEfsSecurityGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.efsSecurityGroup)
    aws.efsSecurityGroup.id = JSON.parse(createEfsSecurityGroupResponse).GroupId
    await api.setEfsSgIngress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)
    await api.setEfsSgEgress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)

    // create EFS
    const createEfsResponse = await api.createEfs(aws.efs.region, aws.efs)
    aws.efs.id = JSON.parse(createEfsResponse).FileSystemId

    // Must wait until life cycle state of EFS is "available" before creating mount target
    let efsState = ''

    while (efsState !== 'available') {
      utils.sleep(500)

      // eslint-disable-next-line no-await-in-loop
      const response = await api.describeFileSystem(aws.efs.id)
      efsState = JSON.parse(response).FileSystems[0].LifeCycleState
    }

    // create mount target in subnet
    const createMountTargetResponse = await api.createMountTarget(aws.efs.id, aws.subnet.id, aws.efsSecurityGroup.id)
    aws.mountTarget.id = JSON.parse(createMountTargetResponse).MountTargetId

    const {path} = await prompts.saveConfig()
    utils.writeConfig(aws, path)
    console.log('It may take around 10 minutes for AWS to fully spin up all infrastructure pieces. But for now, we\'re all done! :D')
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
