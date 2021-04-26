// eslint-disable-next-line unicorn/filename-case
const path = require('path')
const executeProcess = require('./executeProcess.js')

const createAlb = async (name, secGroupId, subnetaId, subnetbId) => {
  return executeProcess(
    'Creating application load balancer'
    'ALB successfully created',
    () => {
      const script = path.resolve(__dirname, '../scripts/albCreate.sh')
      const arg1 = `ALB_NAME=${name}`
      const arg2 = `ALB_SEC_GROUP_ID=${secGroupId}`
      const arg3 = `SUBNETA_ID=${subnetaId}` 
      const arg3 = `SUBNETB_ID=${subnetbId}` 

      return `${arg1} ${arg2} ${arg3} ${arg4} ${script}`
    }
  )
}

module.exports = createAlb
