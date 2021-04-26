const client = require('./client');
const iam = require('./iam');
const ec2 = require('./ec2');
const setEfsSgIngress = require('./efsSecGroupIngress.js');
const setEfsSgEgress = require('./efsSecGroupEgress.js');
const modifyVpcAttribute = require('./vpcModifyAttribute.js');
const createSubnet = require('./subnetCreate.js');
const modifySubnetAttribute = require('./subnetModifyAttribute.js');
const createInternetGateway = require('./igCreate.js');
const attachInternetGateway = require('./igAttach.js');
const createRouteTable = require('./routeTableCreate.js');
const createRoute = require('./routeCreate.js');
const associateRouteTable = require('./routeTableAssociate.js');
const createEfs = require('./efsCreate.js');
const createMountTarget = require('./efsCreateMountTarget.js');
const describeFileSystem = require('./efsDescribeFileSystem.js');
const createEcrRepository = require('./ecrCreateRepository.js');
const createCluster = require('./ecsCreateCluster.js');

const api = {
  client,
  iam,
  ec2,
  setEfsSgIngress,
  setEfsSgEgress,
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
};

module.exports = api;
