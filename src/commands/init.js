const { Command } =  require('@oclif/command')
const prompts = require('../prompts')
const ecsCreateCluster = require('../aws/api/ecsCreateCluster')
const { fleetRootPath, fleetBuildWorkflowTemplatePath } = require('../util/paths');
const { 
  populateWorkflow,
  createWorkflowDir,
  copyWorkflowFilesToRepo,
} = require('../util/fs')


const getAppInfo = async () => {
  const appInfo = await prompts.appInfoPrompt()
  return appInfo
}


class InitCommand extends Command {
  async run() {
    await ecsCreateCluster();
    createWorkflowDir();
    copyWorkflowFilesToRepo();
    const appInfo = await getAppInfo()
    await populateWorkflow(appInfo);
  }
}

InitCommand.description = 'Initialize a Fleet App in your project repository'

module.exports = InitCommand