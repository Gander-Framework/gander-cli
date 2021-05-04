const { Command } =  require('@oclif/command');
const log = require('../util/log');
const Conf = require('conf');
const config = new Conf();

class WhereCommand extends Command {
  async run() {
    process.stdout.write('Your Gander configuration file lives at ');
    log.info(config.path);
  }
}

WhereCommand.description = 'List all active Gander repos';

module.exports = WhereCommand;