const { Command } =  require('@oclif/command');

class ListCommand extends Command {
  async run() {
    
  }
}

ListCommand.description = 'List all active Gander repos';

module.exports = ListCommand;