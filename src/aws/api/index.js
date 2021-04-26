const client = require('./client');
const iam = require('./iam');
const ec2 = require('./ec2');
const efs = require('./efs');
const ecr = require('./ecr');
const createEcrRepository = require('./ecrCreateRepository.js');
const createCluster = require('./ecsCreateCluster.js');

const api = {
  client,
  iam,
  ec2,
  efs,
  ecr,
  createEcrRepository,
  createCluster,
};

module.exports = api;
