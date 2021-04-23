const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')

class destroyCommand extends Command {
  async run() {

  }
}

destroyCommand.description = 'Teardown all of the Fleet infrastructure that was created during initial setup'

module.exports = DestroyCommand