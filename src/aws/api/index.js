const setupIam = require('./iamSetup.js')
const createSecurityGroup = require('./secGroupSetup.js')
const setSgIngress = require('./secGroupIngressSetup.js')
const setEfsSgIngress = require('./efsSecGroupIngress.js')
const setEfsSgEgress = require('./efsSecGroupEgress.js')
const createVpc = require('./vpcCreate.js')
const modifyVpcAttribute = require('./vpcModifyAttribute.js')
const createSubnet = require('./subnetCreate.js')
const modifySubnetAttribute = require('./subnetModifyAttribute.js')
const createInternetGateway = require('./igCreate.js')
const attachInternetGateway = require('./igAttach.js')
const createRouteTable = require('./routeTableCreate.js')
const createRoute = require('./routeCreate.js')
const associateRouteTable = require('./routeTableAssociate.js')
const createEfs = require('./efsCreate.js')
const createMountTarget = require('./efsCreateMountTarget.js')
const describeFileSystem = require('./efsDescribeFileSystem.js')
const createEcrRepository = require('./ecrCreateRepository.js')
const createCluster = require('./ecsCreateCluster.js')
const createPolicy = require('./iamCreatePolicy.js')
const createRole = require('./iamCreateRole.js')
const attachPolicyToRole = require('./iamAttachPolicyToRole.js')
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


const api = {
  setupIam,
  createSecurityGroup,
  setSgIngress,
  setEfsSgIngress,
  setEfsSgEgress,
  createVpc,
  modifyVpcAttribute,
  createSubnet,
  modifySubnetAttribute,
  createInternetGateway,
  attachInternetGateway,
  createRouteTable,
  createRoute,
  associateRouteTable,
  createEfs,
  createMountTarget,
  describeFileSystem,
  createEcrRepository,
  createCluster,
  createPolicy,
  createRole,
  attachPolicyToRole,
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
}

module.exports = api
