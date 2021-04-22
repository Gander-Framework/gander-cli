/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const {fleetRootPath} = require('../../util/paths.js')
const executeProcess = require('./executeProcess.js')

const createRole = async () => {
  return executeProcess(
    'Generating task execution role',
    'Task execution role successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/iamCreateRole.sh')
      const trustPolicy = path.join(fleetRootPath, '/templates/iamPolicies/trustRelationship.json')

      const arg1 = `TRUST_POLICY_PATH=${trustPolicy}`

      return `${arg1} ${script}`
    })
}

module.exports = createRole
