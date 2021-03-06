const { Command } =  require('@oclif/command');
const log = require('../util/log');
const Conf = require('conf');
const config = new Conf();

class ListCommand extends Command {
  async run() {
    const appNames = JSON.parse(config.get('APP_NAMES'));
    log.text('Your current Gander apps:');
    appNames.forEach(appName => log.info(appName));
  }
}

ListCommand.description = 'List all active Gander repos';

module.exports = ListCommand;
