const {
  EC2Client,
  CreateVpcCommand,
  ModifyVpcAttributeCommand,
  CreateSecurityGroupCommand,
  AuthorizeSecurityGroupIngressCommand,
  AuthorizeSecurityGroupEgressCommand,
  CreateSubnetCommand,
  ModifySubnetAttributeCommand,
  CreateInternetGatewayCommand,
  AttachInternetGatewayCommand,
  CreateRouteTableCommand,
  CreateRouteCommand,
  AssociateRouteTableCommand,
} = require('@aws-sdk/client-ec2');

const client = require('./client.js');
const executeProcess = require('./executeSdkProcess.js');

const initializeClient = region => {
  return new EC2Client({
    region,
  });
};

const createVpc = ({ CidrBlock, VpcName }) => executeProcess({
  startMsg: 'Creating VPC',
  successMsg: 'VPC successfully created',
  client: client.ec2,
  command: new CreateVpcCommand({
    CidrBlock,
    TagSpecifications: [{
      ResourceType: 'vpc',
      Tags: [{ Key: 'Name', Value: VpcName }],
    }],
  }),
});

const modifyVpcAttribute = ({ VpcId }) => executeProcess({
  startMsg: 'Configuring VPC ',
  successMsg: 'VPC successfully configured',
  client: client.ec2,
  command: new ModifyVpcAttributeCommand({
    EnableDnsHostnames: { Value: true },
    VpcId,
  }),
});

const createSecurityGroup = ({ VpcId, GroupName, Description }) => executeProcess({
  startMsg: 'Creating security group',
  successMsg: 'Security successfully created',
  client: client.ec2,
  command: new CreateSecurityGroupCommand({
    VpcId,
    GroupName,
    Description,
  }),
});

const authorizeSecurityGroupIngress = ({ GroupId, IpPermissions }) => executeProcess({
  startMsg: 'Configuring security group ingress rules',
  successMsg: 'Security group ingress rules successfully configured',
  client: client.ec2,
  command: new AuthorizeSecurityGroupIngressCommand({
    GroupId,
    IpPermissions,
  }),
});

const authorizeSecurityGroupEgress = ({ GroupId, IpPermissions }) => executeProcess({
  startMsg: 'Configuring security group egress rules',
  successMsg: 'Security group egress rules successfully configured',
  client: client.ec2,
  command: new AuthorizeSecurityGroupEgressCommand({
    GroupId,
    IpPermissions,
  }),
});

const createSubnet = ({ VpcId, AvailabilityZone, CidrBlock, SubnetName }) => executeProcess({
  startMsg: 'Creating subnet',
  successMsg: 'Subnet successfully created',
  client: client.ec2,
  command: new CreateSubnetCommand({
    VpcId,
    AvailabilityZone,
    CidrBlock,
    TagSpecifications: [{
      ResourceType: 'subnet',
      Tags: [{ Key: 'Name', Value: SubnetName }],
    }],
  }),
});

const modifySubnetAttribute = ({ SubnetId }) => executeProcess({
  startMsg: 'Configuring subnet',
  successMsg: 'Subnet successfully configured',
  client: client.ec2,
  command: new ModifySubnetAttributeCommand({
    SubnetId,
    MapPublicIpOnLaunch: { Value: true },
  }),
});

const createInternetGateway = ({ Name }) => executeProcess({
  startMsg: 'Creating internet gateway',
  successMsg: 'Internet gateway successfully created',
  client: client.ec2,
  command: new CreateInternetGatewayCommand({
    TagSpecifications: [{
      ResourceType: 'internet-gateway',
      Tags: [{ Key: 'Name', Value: Name }],
    }],
  }),
});

const attachInternetGateway = ({ VpcId, InternetGatewayId }) => executeProcess({
  startMsg: 'Attaching internet gateway to VPC',
  successMsg: 'Internet gateway successfully attached',
  client: client.ec2,
  command: new AttachInternetGatewayCommand({
    VpcId,
    InternetGatewayId,
  }),
});

const createRouteTable = ({ VpcId, Name }) => executeProcess({
  startMsg: 'Creating route table',
  successMsg: 'Route table successfully created',
  client: client.ec2,
  command: new CreateRouteTableCommand({
    VpcId,
    TagSpecifications: [{
      ResourceType: 'route-table',
      Tags: [{ Key: 'Name', Value: Name }],
    }],
  }),
});

const createRoute = ({ RouteTableId, GatewayId }) => executeProcess({
  startMsg: 'Creating route to internet gateway',
  successMsg: 'Route successfully created',
  client: client.ec2,
  command: new CreateRouteCommand({
    RouteTableId,
    GatewayId,
    DestinationCidrBlock: '0.0.0.0/0',
  }),
});

const associateRouteTable = ({ RouteTableId, SubnetId }) => executeProcess({
  startMsg: 'Associating route table with subnet',
  successMsg: 'Route table successfully associated',
  client: client.ec2,
  command: new AssociateRouteTableCommand({
    RouteTableId,
    SubnetId,
  }),
});

module.exports = {
  initializeClient,
  createVpc,
  modifyVpcAttribute,
  createSecurityGroup,
  authorizeSecurityGroupIngress,
  authorizeSecurityGroupEgress,
  createSubnet,
  modifySubnetAttribute,
  createInternetGateway,
  attachInternetGateway,
  createRouteTable,
  createRoute,
  associateRouteTable,
};
