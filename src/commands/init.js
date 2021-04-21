const { Command } =  require('@oclif/command')
const prompts = require('../prompts')
const utils = require('../util')
const { fleetRootPath, fleetBuildWorkflowPath } = require('../util/paths');
const { injectInfoIntoWorkflow } = require('../util/fs')

const getTestInput = async () => {
  const appInfo = await prompts.testInitPrompt()
  appInfo.FOUR_EYES_SUPREMACY = appInfo.FOUR_EYES_SUPREMACY === 'yes' ? true : false
  return appInfo
} 


class InitCommand extends Command {
  async run() {
    //console.log(await getTestInput());
    const appInfo = await getTestInput()
    await injectInfoIntoWorkflow(appInfo);
  }
}

InitCommand.description = 'Initialize a Fleet App in your project repository'

module.exports = InitCommand