const path = require('path')
const exec = util.promisify(require('child_process').exec)
const Conf = require('conf')
const config = new Conf()

const iamDeletePolicy = async () => {
  const script = path.resolve(__dirname, '../scripts/iamDeletePolicy.sh')
  const arg1 = `POLICY_ARN=${config.get('POLICY_ARN')}`

  try {
    const { stdout, stderr } = await exec(`${arg1} ${script}`)
    return { iamDeletePolicy: stdout, iamDeletePolicy: { awsError: stderr } }
  } catch (error) {
    return { iamDeletePolicyResponse: {}, iamDeletePolicyError: error}
  }
}

module.exports = iamDeletePolicy