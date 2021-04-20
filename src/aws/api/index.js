const setupIam = require('./iamSetup.js')
const createSecurityGroup = require('./secGroupSetup.js')
const setSgIngress = require('./secGroupIngressSetup.js')
const setEfsSgIngress = require('./efsSecGroupIngress.js')
const setEfsSgEgress = require('./efsSecGroupEgress.js')
const createVpc = require('./vpcCreate.js')
const createSubnet = require('./subnetCreate.js')
const createInternetGateway = require('./igCreate.js')
const attachInternetGateway = require('./igAttach.js')
const createRouteTable = require('./routeTableCreate.js')
const createRoute = require('./routeCreate.js')
const associateRouteTable = require('./routeTableAssociate.js')
const createEfs = require('./efsCreate.js')
const createMountTarget = require('./efsCreateMountTarget.js')
const describeFileSystem = require('./efsDescribeFileSystem.js')

const api = {
  setupIam,
  createSecurityGroup,
  setSgIngress,
  setEfsSgIngress,
  setEfsSgEgress,
  createVpc,
  createSubnet,
  createInternetGateway,
  attachInternetGateway,
  createRouteTable,
  createRoute,
  associateRouteTable,
  createEfs,
  createMountTarget,
  describeFileSystem,
}

module.exports = api
