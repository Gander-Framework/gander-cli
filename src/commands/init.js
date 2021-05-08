const { Command } =  require('@oclif/command');
const prompts = require('../prompts');
const api = require('../aws');
const Conf = require('conf');
const config = new Conf();
const log = require('../util/log.js');
const {
  populateWorkflows,
  createWorkflowDir,
  copyWorkflowFilesToRepo,
} = require('../util/fs');

const getAppInfo = async () => {
  const appInfo = await prompts.appInfoPrompt();
  return appInfo;
};

const addAppToConfigFile = APP_NAME => {
  if(config.get('APP_NAMES') === undefined) {
    log.warn('Oops! Something went wrong T^T \nPlease run gander destroy and try again.')
    process.exit(1)
  }

  let apps = JSON.parse(config.get('APP_NAMES'));
  apps.push(APP_NAME);
  config.set('APP_NAMES', JSON.stringify(apps));
};

class InitCommand extends Command {
  async run() {
    log.header('🐥 Initializing your project repository with Gander\n');
    createWorkflowDir();
    copyWorkflowFilesToRepo();
    const appInfo = await getAppInfo();
    addAppToConfigFile(appInfo.APP_NAME);
    
    api.clients.ecs = await api.initializeEcsClient(config.get('AWS_REGION'));
    await api.createCluster({ clusterName: appInfo.APP_NAME });

    await populateWorkflows(appInfo);
  }
}

InitCommand.description = 'Initialize your project repository as a Gander review app';

module.exports = InitCommand;
