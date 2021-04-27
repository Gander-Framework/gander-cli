const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')
const Conf = require('conf')
const config = new Conf()
const {fleetRootPath, fleetBuildWorkflowTemplatePath} = require('../util/paths')
const {
  populateWorkflows,
  createWorkflowDir,
  copyWorkflowFilesToRepo,
} = require('../util/fs')

const getAppInfo = async () => {
  const appInfo = await prompts.appInfoPrompt()
  return appInfo
}

const addAppToConfigFile = APP_NAME => {
  let apps = JSON.parse(config.get('APP_NAMES'))
  apps.push(APP_NAME)
  config.set('APP_NAMES', JSON.stringify(apps))
}

class InitCommand extends Command {
  async run() {
    createWorkflowDir()
    copyWorkflowFilesToRepo()
    const appInfo = await getAppInfo()
    addAppToConfigFile(appInfo.APP_NAME)
    await api.createCluster(appInfo.APP_NAME)
    await populateWorkflows(appInfo)
  }
}

InitCommand.description = 'Initialize a Fleet App in your project repository'

module.exports = InitCommand
