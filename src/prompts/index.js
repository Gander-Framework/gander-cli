const setupIam = require('./iamSetup.js')
const createSecurityGroup = require('./secGroupSetup.js')
const createVpc = require('./vpcCreate.js')
const createSubnet = require('./subnetCreate.js')
const createInternetGateway = require('./igCreate.js')
const createRouteTable = require('./routeTableCreate.js')
const createEfs = require('./efsCreate.js')

const prompts = {
  setupIam,
  createSecurityGroup,
  createVpc,
  createSubnet,
  createInternetGateway,
  createRouteTable,
  createEfs,
}

module.exports = prompts
