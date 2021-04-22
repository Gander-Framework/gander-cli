const fs = require('fs')
const { fleetBuildWorkflowTemplatePath } = require('./paths');


const injectInfoIntoWorkflow = (appInfo) => {
  let buildWorkflowFile = fs.readFileSync(fleetBuildWorkflowTemplatePath, "utf8")
  buildWorkflowFile = buildWorkflowFile.replace("FOUR_EYES_SUPREMACY", appInfo.FOUR_EYES_SUPREMACY)
  buildWorkflowFile = buildWorkflowFile.replace("APP_NAME", appInfo.APP_NAME)
  buildWorkflowFile = buildWorkflowFile.replace("APP_SERVER_PATH", appInfo.APP_SERVER_PATH)
  buildWorkflowFile = buildWorkflowFile.replace("DB_SETUP_PATH", appInfo.DB_SETUP_PATH)
  buildWorkflowFile = buildWorkflowFile.replace("DATABASE_NAME", appInfo.DATABASE_NAME)
  fs.writeFileSync(fleetBuildWorkflowTemplatePath, buildWorkflowFile)
}

const copyWorkflowFiles = () => {

}

module.exports = {
  injectInfoIntoWorkflow,
}