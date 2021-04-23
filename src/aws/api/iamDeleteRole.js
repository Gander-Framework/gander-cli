const path = require('path')
const exec = util.promisify(require('child_process').exec)
const Conf = require('conf')
const config = new Conf()

const iamDeleteRole = async () => {
  const script = path.resolve(__dirname, '../scripts/iamDeleteRole.sh')
  const arg1 = `ROLE_NAME=fleetTaskExecutionRole`

  try {
    const { stdout, stderr } = await exec(`${arg1} ${script}`)
    return { iamDeleteRole: stdout, iamDeleteRole: { awsError: stderr } }
  } catch (error) {
    return { iamDeleteRoleResponse: {}, iamDeleteRoleError: error}
  }
}

module.exports = iamDeleteRole