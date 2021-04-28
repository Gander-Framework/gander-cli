const createCluster = require('./ecsCreateCluster.js');
const deleteCluster = require('./deleteCluster')
const createStack = require('./stackCreate.js')
const getStackOutputs = require('./getStackOutputs.js')
const destroyStack = require('./deleteStack')
const api = {
  createStack,
  getStackOutputs,
  destroyStack,
  createCluster,
  deleteCluster,
};

module.exports = api;
