// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const Conf = require('conf')
const config = new Conf()

const describeLoadBalancers = async () => {
  const script = path.resolve(__dirname, '../scripts/loadBalancersDescribe.sh')
  const arg1 = `ALB_LB_ARN=${config.get('ALB_ARN')}`

  try {
    const {stdout, stderr} = await exec(`${arg1} ${script}`)
    return stdout
  } catch (error) {
    return error.stderr
  }
}

module.exports = describeLoadBalancers
