const client = require('./client');
const iam = require('./iam');
const ec2 = require('./ec2');
const createEfs = require('./efsCreate.js');
const createMountTarget = require('./efsCreateMountTarget.js');
const describeFileSystem = require('./efsDescribeFileSystem.js');
const createEcrRepository = require('./ecrCreateRepository.js');
const createCluster = require('./ecsCreateCluster.js');

const api = {
  client,
  iam,
  ec2,
  createEfs,
  createMountTarget,
  describeFileSystem,
  createEcrRepository,
  createCluster,
};

module.exports = api;
