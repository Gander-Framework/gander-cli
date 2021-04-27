const {Command} =  require('@oclif/command')
const api = require('../aws/api')
const log = require('../util/log')
const utils = require('../util')

class DestroyCommand extends Command {
  async run() {
    await api.destroyAlb()

    let albDeleted = false
    const pollSpinner = log.spin('Deleting ALB and listener')
    while (!albDeleted) {
      utils.sleep(500)
      const describeLoadBalancersResponse = await api.describeLoadBalancers()
      const lbLength = JSON.parse(describeLoadBalancersResponse).LoadBalancerDescriptions.length
      albDeleted = lbLength === 0
    }
    pollSpinner.succeed('ALB and listener deleted')

    await api.destroyAlbSubnetsSg()
  }
}

DestroyCommand.description = 'Destroy the ALB and its associated resources'

module.exports = DestroyCommand
