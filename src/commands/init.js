const { Command } =  require('@oclif/command')
const prompts = require('../prompts')
const utils = require('../util')
const path = require('path');


class InitCommand extends Command {
  async run() {
    console.log(path.join(__dirname, "/../.."));  
    console.log(process.cwd())
  }
}

InitCommand.description = 'Initialize a Fleet App in your project repository'

module.exports = InitCommand