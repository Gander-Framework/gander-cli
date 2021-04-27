const {Command} = require('@oclif/command')
const api = require('../aws/api')
const prompts = require('../prompts')
const utils = require('../util')
const log = require('../util/log.js')
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
    aws.subneta.availabilityZone = `${initialConfig.awsRegion}a`
    aws.subnetb.availabilityZone = `${initialConfig.awsRegion}b`

    console.log('\nGenerating your Fleet infrastructure. This may take a few minutes, so grab some coffee~ \n')

    if (initialConfig.generateIam === 'yes') {
      await api.setupIam(aws.iam)
    } else {
      aws.iam = null
    }

    // Create task execution role
    const createPolicyResponse = await api.createPolicy()
    const policyArn = JSON.parse(createPolicyResponse).Policy.Arn
    await api.createRole()
    await api.attachPolicyToRole(policyArn)

    // Create and configure VPC
    const createVpcResponse = await api.createVpc(aws.vpc)
    aws.vpc.id = JSON.parse(createVpcResponse).Vpc.VpcId
    config.set('VPC_ID', aws.vpc.id)
    await api.modifyVpcAttribute(aws.vpc.id)

    // Create security groups and rules
    const clusterSecurityGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.clusterSecurityGroup)
    aws.clusterSecurityGroup.id = JSON.parse(clusterSecurityGroupResponse).GroupId
    config.set('CLUSTER_SECURITY_GROUP_ID', aws.clusterSecurityGroup.id)
    await api.setSgIngress(aws.clusterSecurityGroup.id)

    // Create security groups and rules
    const albSecurityGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.albSecurityGroup)
    aws.albSecurityGroup.id = JSON.parse(albSecurityGroupResponse).GroupId
    config.set('ALB_SECURITY_GROUP_ID', aws.albSecurityGroup.id)
    await api.setSgIngress(aws.albSecurityGroup.id)
    await api.setSgEgress(aws.albSecurityGroup.id)

    // Create and configure private subnet
    const createSubnetResponse = await api.createSubnet(aws.vpc.id, aws.subnet)
    aws.subnet.id = JSON.parse(createSubnetResponse).Subnet.SubnetId
    config.set('CLUSTER_SUBNET_ID', aws.subnet.id)
    await api.modifySubnetAttribute(aws.subnet.id)

    // Create and configure public subnet a
    const createSubnetAResponse = await api.createSubnet(aws.vpc.id, aws.subneta)
    aws.subneta.id = JSON.parse(createSubnetAResponse).Subnet.SubnetId
    config.set('CLUSTER_SUBNETA_ID', aws.subneta.id)
    await api.modifySubnetAttribute(aws.subneta.id)

    // Create and configure public subnet b
    const createSubnetBResponse = await api.createSubnet(aws.vpc.id, aws.subnetb)
    aws.subnetb.id = JSON.parse(createSubnetBResponse).Subnet.SubnetId
    config.set('CLUSTER_SUBNETB_ID', aws.subnetb.id)
    await api.modifySubnetAttribute(aws.subnetb.id)

    // Create and attach internet gateway
    const createInternetGatewayResponse = await api.createInternetGateway(aws.internetGateway)
    aws.internetGateway.id = JSON.parse(createInternetGatewayResponse).InternetGateway.InternetGatewayId
    config.set('IGW_ID', aws.internetGateway.id)
    await api.attachInternetGateway(aws.internetGateway.id, aws.vpc.id)

    // Create route table
    const createRouteTableResponse = await api.createRouteTable(aws.vpc.id, aws.routeTable)
    aws.routeTable.id = JSON.parse(createRouteTableResponse).RouteTable.RouteTableId
    config.set('ROUTE_TABLE_ID', aws.routeTable.id)

    // Create route
    await api.createRoute(aws.routeTable.id, aws.internetGateway.id)

    // Associate route table
    await api.associateRouteTable(aws.routeTable.id, aws.subnet.id)
    await api.associateRouteTable(aws.routeTable.id, aws.subneta.id)
    await api.associateRouteTable(aws.routeTable.id, aws.subnetb.id)

    // Create Application Load Balancer
    const createAlbResponse = await api.createAlb(aws.alb.name, aws.albSecurityGroup.id, aws.subneta.id, aws.subnetb.id)
    aws.alb.arn = JSON.parse(createAlbResponse).LoadBalancers[0].LoadBalancerArn
    config.set('ALB_ARN', aws.alb.arn)

    const createListenerResponse = await api.createListener(aws.alb.arn)
    aws.listener.arn = JSON.parse(createListenerResponse).Listeners[0].ListenerArn
    config.set('LISTENER_ARN', aws.listener.arn)

    // Retrieve DNS Name for ALB
    const describeLbResponse = await api.retrieveDnsName(aws.alb.arn)
    const albDnsName = JSON.parse(describeLbResponse).LoadBalancers[0].DNSName
    console.log('   ')
    console.log('Create a CNAME record at your custom domain')
    console.log(`Map '*.staging' to this DNS Name:  ${albDnsName}`)
    console.log('   ')

    // Create EFS security group and rules
    const createEfsSecurityGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.efsSecurityGroup)
    aws.efsSecurityGroup.id = JSON.parse(createEfsSecurityGroupResponse).GroupId
    config.set('EFS_SECURITY_GROUP_ID', aws.efsSecurityGroup.id)

    await api.setEfsSgIngress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)
    await api.setEfsSgEgress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)

    // create EFS
    const createEfsResponse = await api.createEfs(aws.efs.region, aws.efs)
    aws.efs.id = JSON.parse(createEfsResponse).FileSystemId
    config.set('EFS_ID', aws.efs.id)

    // Must wait until life cycle state of EFS is "available" before creating mount target
    let efsState = ''
    const pollSpinner = log.spin('Initializing file system')
    while (efsState !== 'available') {
      utils.sleep(500)

      // eslint-disable-next-line no-await-in-loop
      const response = await api.describeFileSystem(aws.efs.id)
      efsState = JSON.parse(response).FileSystems[0].LifeCycleState

      if (efsState === 'available') {
        pollSpinner.succeed('File system initialized')
      }
    }

    // create mount target in subnet
    const createMountTargetResponse = await api.createMountTarget(aws.efs.id, aws.subnet.id, aws.efsSecurityGroup.id)
    aws.mountTarget.id = JSON.parse(createMountTargetResponse).MountTargetId
    config.set('MOUNT_TARGET_ID', aws.mountTarget.id)

    // Create ECR repository
    await api.createEcrRepository()

    console.log('It may take around 10 minutes for AWS to fully spin up all infrastructure pieces. \nBut for now, we\'re all done! :D')

    config.set('DEFAULT_SUBNET_NAME', DEFAULT_NAME)
    config.set('CLUSTER_SECURITY_GROUP', `${DEFAULT_NAME}-cluster`)
    config.set('EFS_CREATION_TOKEN', DEFAULT_NAME)
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
