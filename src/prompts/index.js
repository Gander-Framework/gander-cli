const welcome = require('./welcome.js')
const setupIam = require('./iamSetup.js')
const createSecurityGroup = require('./secGroupSetup.js')
const createVpc = require('./vpcCreate.js')
const createSubnet = require('./subnetCreate.js')
const createInternetGateway = require('./igCreate.js')
const createRouteTable = require('./routeTableCreate.js')
const createEfs = require('./efsCreate.js')
const saveConfig = require('./saveConfig.js')
const testInitPrompt = require('./testInitPrompt');
const appInfoPrompt = require('./appInfoPrompt');


const prompts = {
  welcome,
  setupIam,
  createSecurityGroup,
  createVpc,
  createSubnet,
  createInternetGateway,
  createRouteTable,
  createEfs,
  saveConfig,
  testInitPrompt,
  appInfoPrompt
}

module.exports = prompts
