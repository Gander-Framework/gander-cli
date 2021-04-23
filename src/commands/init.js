const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')
const {fleetRootPath, fleetBuildWorkflowTemplatePath} = require('../util/paths')
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
    createWorkflowDir()
    copyWorkflowFilesToRepo()
    const appInfo = await getAppInfo()
    await api.createCluster()
    await populateWorkflow(appInfo)
  }
}

InitCommand.description = 'Initialize a Fleet App in your project repository'

module.exports = InitCommand
