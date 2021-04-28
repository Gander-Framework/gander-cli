const { Command } =  require('@oclif/command');
const api = require('../aws/api');
const Conf = require('conf');
const config = new Conf();

const DEFAULT_NAME = 'gander-apps';

const destroyAllClusters = () => {
  const appNames = JSON.parse(config.get('APP_NAMES'));
  appNames.forEach(name => {
    api.deleteCluster(name);
  });
};

class DestroyCommandCF extends Command {
  async run() {
    api.clients.cloudFormation = await api.initializeCfClient(config.get('AWS_REGION'));

    api.clients.ecs = await api.initializeEcsClient(config.get('AWS_REGION'));

    await api.deleteStack({ StackName: DEFAULT_NAME });
    destroyAllClusters();
  }
}

DestroyCommandCF.description = 'Destroy all AWS resources created for Gander review apps';

module.exports = DestroyCommandCF;
