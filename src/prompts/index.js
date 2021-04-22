const welcome = require('./welcome.js')
const saveConfig = require('./saveConfig.js')
const testInitPrompt = require('./testInitPrompt');
const appInfoPrompt = require('./appInfoPrompt');


const prompts = {
  welcome,
  saveConfig,
  testInitPrompt,
  appInfoPrompt
}

module.exports = prompts
