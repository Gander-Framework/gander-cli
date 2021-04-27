const client = require('./client');
const iam = require('./iam');
const ec2 = require('./ec2');
const efs = require('./efs');
const ecr = require('./ecr');
const createCluster = require('./ecsCreateCluster.js');
const createAlb = require('./albCreate.js')
const createListener = require('./listenerCreate.js')
const retrieveDnsName = require('./dnsRetrieve.js')
const destroyAlb = require('./albDestroy.js')
const destroyAlbSubnetsSg = require('./albSubnetsSgDestroy.js')
const describeLoadBalancers = require('./loadBalancersDescribe.js')
const iamDeletePolicy = require('./iamDeletePolicy.js')
const iamDeleteRole = require('./iamDeleteRole')
const deleteMountTarget = require('./efsDeleteMountTarget')
const efsDelete = require('./destroy/efsDelete')
const ecrRepoDelete = require('./destroy/ecrRepoDelete')
const vpcDelete = require('./destroy/vpcDelete')
const iamDetachPolicyRole = require('./destroy/iamDetachPolicyRole')
const describeMountTargets = require('./efsDescribeMountTargets')
const disassociateRouteTable = require('./destroy/disassociateRouteTable')
const deleteRouteTable = require('./destroy/deleteRouteTable')
const detachInternetGateway = require('./destroy/detachInternetGateway')
const deleteInternetGateway = require('./destroy/deleteInternetGateway')
const deleteSubnet = require('./destroy/deleteSubnet')
const deleteSecurityGroup = require('./destroy/deleteSecurityGroup')
const revokeSecurityGroupIngress = require('./destroy/revokeSecurityGroupIngress')
const revokeSecurityGroupEgress = require('./destroy/revokeSecurityGroupEgress')
const deleteCluster = require('./destroy/deleteCluster')
const createSecurityGroup = require('./secGroupSetup')
const setSgIngress = require('./secGroupIngressSetup.js')
const setSgEgress = require('./secGroupEgressSetup.js')
const createSubnet = require('./subnetCreate.js')
const modifySubnetAttribute = require('./subnetModifyAttribute.js')
const associateRouteTable = require('./routeTableAssociate.js')
const createStack = require('./stackCreate.js')
const getStackOutputs = require('./getStackOutputs.js')
const deleteStack = require('./destroy/deleteStack')
const api = {
  client,
  iam,
  ec2,
  efs,
  ecr,
  createCluster,
  createAlb,
  createListener,
  retrieveDnsName,
  destroyAlb,
  destroyAlbSubnetsSg,
  describeLoadBalancers,
  iamDeletePolicy,
  iamDeleteRole,
  deleteMountTarget,
  vpcDelete,
  efsDelete,
  ecrRepoDelete, 
  iamDetachPolicyRole,
  describeMountTargets, 
  disassociateRouteTable,
  deleteRouteTable,
  detachInternetGateway,
  deleteInternetGateway,
  deleteSubnet,
  deleteSecurityGroup,
  revokeSecurityGroupIngress,
  revokeSecurityGroupEgress,
  deleteCluster,
  createSecurityGroup,
  setSgIngress,
  setSgEgress,
  modifySubnetAttribute,
  createSubnet,
  associateRouteTable,
  createStack,
  getStackOutputs,
  deleteStack,
};

module.exports = api;
