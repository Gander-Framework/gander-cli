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
}

module.exports = api
