const {Command} =  require('@oclif/command')
const api = require('../aws/api')

class DestroyCommand extends Command {
  async run() {
    await api.destroyAlb()
  }
}

DestroyCommand.description = 'Destroy the ALB and its associated resources'

module.exports = DestroyCommand
