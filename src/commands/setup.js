const { Command } = require('@oclif/command');
const api = require('../aws/api');
const prompts = require('../prompts');
const utils = require('../util');

const Conf = require('conf');
const config = new Conf();

const DEFAULT_NAME = 'fleet-apps';

class SetupCommand extends Command {
  async run() {
    let aws = utils.readConfig();

    const initialConfig = await prompts.welcome();

    config.set('AWS_REGION', initialConfig.awsRegion);
    aws.efs.availabilityZone = `${initialConfig.awsRegion}a`;

    console.log('\nGenerating your Fleet infrastructure. This may take a few minutes, so grab some coffee~ \n');

    aws.subnet.availabilityZone = `${initialConfig.awsRegion}a`
    aws.subneta.availabilityZone = `${initialConfig.awsRegion}a`
    aws.subnetb.availabilityZone = `${initialConfig.awsRegion}b`

    // Initialize IAM client with correct region
    api.client.iam = api.iam.initializeClient(initialConfig.awsRegion);

    if (initialConfig.generateIam === 'yes') {
      await api.iam.createGroup({ GroupName: aws.iam.groupName });
      await api.iam.createUser({ UserName: aws.iam.userName });
    } else {
      aws.iam.groupName = null;
      aws.iam.userName = null;
    }

    // Create task execution role

    const createPolicyResponse = await api.iam.createPolicy({
      PolicyName: aws.iam.policy.name,
      PolicyPath: aws.iam.policy.path,
    });
    aws.iam.policy.arn = createPolicyResponse.Policy.Arn;

    await api.iam.createRole({
      RoleName: aws.iam.role.name,
      TrustPath: aws.iam.role.path,
    });
    await api.iam.attachRolePolicy({
      RoleName: aws.iam.role.name,
      PolicyArn: aws.iam.policy.arn,
    });
    
    config.set('POLICY_ARN', aws.iam.policy.arn)
    api.client.ec2 = api.ec2.initializeClient(initialConfig.awsRegion);




    // Create and configure VPC
    const createVpcResponse = await api.ec2.createVpc({
      CidrBlock: aws.vpc.cidrBlock,
      VpcName: aws.vpc.name,
    });

    aws.vpc.id = createVpcResponse.Vpc.VpcId;
    config.set('VPC_ID', aws.vpc.id);
    await api.ec2.modifyVpcAttribute({ VpcId: aws.vpc.id });

    // Create security groups and rules
    const clusterSecurityGroupResponse = await api.ec2.createSecurityGroup({
      VpcId: aws.vpc.id,
      GroupName: aws.clusterSecurityGroup.name,
      Description: aws.clusterSecurityGroup.description,
    });
    aws.clusterSecurityGroup.id = clusterSecurityGroupResponse.GroupId;
    config.set('CLUSTER_SECURITY_GROUP_ID', aws.clusterSecurityGroup.id);

    await api.ec2.authorizeSecurityGroupIngress({
      GroupId: aws.clusterSecurityGroup.id,
      IpPermissions: [
        {
          FromPort: 80,
          ToPort: 80,
          IpProtocol: 'tcp',
          IpRanges: [{ CidrIp: '0.0.0.0/0' }],
        },
        {
          FromPort: 443,
          ToPort: 443,
          IpProtocol: 'tcp',
          IpRanges: [{ CidrIp: '0.0.0.0/0' }],
        },
        {
          FromPort: 2049,
          ToPort: 2049,
          IpProtocol: 'tcp',
          IpRanges: [{ CidrIp: '0.0.0.0/0' }],
        },
        {
          FromPort: 8080,
          ToPort: 8080,
          IpProtocol: 'tcp',
          IpRanges: [{ CidrIp: '0.0.0.0/0' }],
        },
      ],
    });


    // Create and configure subnet
    const createSubnetResponse = await api.ec2.createSubnet({
      VpcId: aws.vpc.id,
      AvailabilityZone: aws.subnet.availabilityZone,
      CidrBlock: aws.subnet.cidrBlock,
      SubnetName: aws.subnet.name,
    });
    aws.subnet.id = createSubnetResponse.Subnet.SubnetId;
    config.set('CLUSTER_SUBNET_ID', aws.subnet.id);

    await api.ec2.modifySubnetAttribute({ SubnetId: aws.subnet.id });

    // Create security groups and rules
    const albSecurityGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.albSecurityGroup)
    aws.albSecurityGroup.id = JSON.parse(albSecurityGroupResponse).GroupId
    config.set('ALB_SECURITY_GROUP_ID', aws.albSecurityGroup.id)
    await api.setSgIngress(aws.albSecurityGroup.id)
    await api.setSgEgress(aws.albSecurityGroup.id)


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
    const createInternetGatewayResponse = await api.ec2.createInternetGateway({ Name: aws.internetGateway.name });
    aws.internetGateway.id = createInternetGatewayResponse.InternetGateway.InternetGatewayId;
    config.set('IGW_ID', aws.internetGateway.id);

    await api.ec2.attachInternetGateway({
      InternetGatewayId: aws.internetGateway.id, VpcId: aws.vpc.id,
    });

    // Create route table
    const createRouteTableResponse = await api.ec2.createRouteTable({
      VpcId: aws.vpc.id,
      Name: aws.routeTable.name,
    });
    aws.routeTable.id = createRouteTableResponse.RouteTable.RouteTableId;
    config.set('ROUTE_TABLE_ID', aws.routeTable.id);

    // Create route
    await api.ec2.createRoute({
      RouteTableId: aws.routeTable.id,
      GatewayId: aws.internetGateway.id,
    });

    // Associate route table
    await api.ec2.associateRouteTable({
      RouteTableId: aws.routeTable.id,
      SubnetId: aws.subnet.id,
    });

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

   const associateRouteTableResponse = await api.associateRouteTable(aws.routeTable.id, aws.subnet.id)
   aws.routeTable.associationId = JSON.parse(associateRouteTableResponse).AssociationId
   config.set('ASSOCIATION_ID', aws.routeTable.associationId)


    // Create EFS security group and rules
    const createEfsSecurityGroupResponse = await api.ec2.createSecurityGroup({
      VpcId: aws.vpc.id,
      GroupName: aws.efsSecurityGroup.name,
      Description: aws.efsSecurityGroup.description,
    });
    aws.efsSecurityGroup.id = createEfsSecurityGroupResponse.GroupId;
    config.set('EFS_SECURITY_GROUP_ID', aws.efsSecurityGroup.id);

    await api.ec2.authorizeSecurityGroupIngress({
      GroupId: aws.efsSecurityGroup.id,
      IpPermissions: [
        {
          FromPort: 2049,
          ToPort: 2049,
          IpProtocol: 'tcp',
          UserIdGroupPairs: [{ GroupId: aws.clusterSecurityGroup.id }],
        },
      ],
    });

    await api.ec2.authorizeSecurityGroupEgress({
      GroupId: aws.clusterSecurityGroup.id,
      IpPermissions: [
        {
          FromPort: 2049,
          ToPort: 2049,
          IpProtocol: 'tcp',
          UserIdGroupPairs: [{ GroupId: aws.efsSecurityGroup.id }],
        },
      ],
    });

    api.client.efs = api.efs.initializeClient(initialConfig.awsRegion);
    // create EFS
    const createEfsResponse = await api.efs.createFileSystem({
      AvailabilityZoneName: aws.efs.availabilityZone,
      CreationToken: aws.efs.creationToken,
      Name: aws.efs.Name });
    aws.efs.id = createEfsResponse.FileSystemId;
    config.set('EFS_ID', aws.efs.id);

    // Must wait until life cycle state of EFS is "available" before creating mount target

    let efsState = ''
    const pollSpinner = log.spin('Initializing file system')

    while (efsState !== 'available') {
      utils.sleep(500);

      // eslint-disable-next-line no-await-in-loop

      const response = await api.efs.describeFileSystem({ FileSystemId: aws.efs.id });
      efsState = response.FileSystems[0].LifeCycleState;


      if (efsState === 'available') {
        pollSpinner.succeed('File system initialized')
      }
    }

    // create mount target in subnet
    const createMountTargetResponse = await api.efs.createMountTarget({
      FileSystemId: aws.efs.id,
      SubnetId: aws.subnet.id,
      SecurityGroups: [aws.efsSecurityGroup.id],
    });
    aws.mountTarget.id = createMountTargetResponse.MountTargetId;
    config.set('MOUNT_TARGET_ID', aws.mountTarget.id);

    // Create ECR repository
    api.client.ecr = api.ecr.initializeClient(initialConfig.awsRegion);
    await api.ecr.createRepository();

    console.log('It may take around 10 minutes for AWS to fully spin up all infrastructure pieces. \nBut for now, we\'re all done! :D')

    config.set('DEFAULT_SUBNET_NAME', DEFAULT_NAME)
    config.set('CLUSTER_SECURITY_GROUP', `${DEFAULT_NAME}-cluster`)
    config.set('EFS_CREATION_TOKEN', DEFAULT_NAME)
    config.set('APP_NAMES', "[]")
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live';

module.exports = SetupCommand;
