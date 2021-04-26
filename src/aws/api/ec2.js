const {
  EC2Client,
  CreateVpcCommand,
  ModifyVpcAttributeCommand,
  CreateSecurityGroupCommand,
  AuthorizeSecurityGroupIngressCommand,
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
  startMsg: 'Configuring security group',
  successMsg: 'Security group successfully configured',
  client: client.ec2,
  command: new AuthorizeSecurityGroupIngressCommand({
    GroupId,
    IpPermissions,
  }),
});

module.exports = {
  initializeClient,
  createVpc,
  modifyVpcAttribute,
  createSecurityGroup,
  authorizeSecurityGroupIngress,
};
