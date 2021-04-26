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
    aws.subnet.availabilityZone = `${initialConfig.awsRegion}a`;
    aws.efs.availabilityZone = `${initialConfig.awsRegion}a`;

    console.log('\nGenerating your Fleet infrastructure. This may take a few minutes, so grab some coffee~ \n');
    /*
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
*/
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
    let efsState = '';

    while (efsState !== 'available') {
      utils.sleep(500);

      // eslint-disable-next-line no-await-in-loop
      const response = await api.efs.describeFileSystem({ FileSystemId: aws.efs.id });
      efsState = response.FileSystems[0].LifeCycleState;
    }

    // create mount target in subnet
    const createMountTargetResponse = await api.efs.createMountTarget({
      FileSystemId: aws.efs.id,
      SubnetId: aws.subnet.id,
      SecurityGroups: [aws.efsSecurityGroup.id],
    });
    aws.mountTarget.id = createMountTargetResponse.MountTargetId;
    config.set('MOUNT_TARGET_ID', aws.mountTarget.id);
    /*
    // Create ECR repository
    await api.createEcrRepository();
*/
    console.log('It may take around 10 minutes for AWS to fully spin up all infrastructure pieces. But for now, we\'re all done! :D');

    config.set('DEFAULT_SUBNET_NAME', DEFAULT_NAME);
    config.set('CLUSTER_SECURITY_GROUP', `${DEFAULT_NAME}-cluster`);
    config.set('EFS_CREATION_TOKEN', DEFAULT_NAME);

    console.log('All done! :D');
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live';

module.exports = SetupCommand;
