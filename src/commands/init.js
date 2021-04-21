const { Command } =  require('@oclif/command')
const prompts = require('../prompts')
const utils = require('../util')


class InitCommand extends Command {

}

InitCommand.description = 'Initialize a Fleet App in your project repository'

module.exports = InitCommand