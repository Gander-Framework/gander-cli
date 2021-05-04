const { Command } =  require('@oclif/command');
const log = require('../util/log');
const Conf = require('conf');
class LogoCommand extends Command {
  async run() {
    log.printLogo()
  }
}

LogoCommand.description = ':goose:';

module.exports = LogoCommand;
