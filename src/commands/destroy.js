const { Command } =  require('@oclif/command');
const api = require('../aws/api');
const Conf = require('conf');
const config = new Conf();

const destroyAllClusters = () => {
  const appNames = JSON.parse(config.get('APP_NAMES'));
  appNames.forEach(name => {
    api.deleteCluster(name);
  });
};

class DestroyCommandCF extends Command {
  async run() {
    await api.destroyStack('fleet-apps');
    destroyAllClusters();
  }
}

DestroyCommandCF.description = 'Destroy all AWS resources created for Gander review apps';

module.exports = DestroyCommandCF;
