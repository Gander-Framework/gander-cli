const {Command} =  require('@oclif/command')
const prompts = require('../prompts')
const api = require('../aws/api')
const utils = require('../util')
const log = require('../util/log')
const Conf = require('conf')
const config = new Conf()


const destroyAllClusters = () => {
  const appNames = JSON.parse(config.get('APP_NAMES'))
  appNames.forEach(name => {
    // TODO: call api.deleteCluster
    api.deleteCluster(name)
  })
}

class DestroyCommandCF extends Command {
  async run() {
    await api.destroyStack('fleet-apps')
    destroyAllClusters()
  }
}

DestroyCommandCF.description = 'Teardown all of the Fleet infrastructure that was created during initial setup using CloudFormation'

module.exports = DestroyCommandCF
