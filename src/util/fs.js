const fs = require('fs')
const { fleetBuildWorkflowPath } = require('./paths');


const injectInfoIntoWorkflow = (appInfo) => {
  let buildWorkflowFile = fs.readFileSync(fleetBuildWorkflowPath, "utf8")
  buildWorkflowFile = buildWorkflowFile.replace("FOUR_EYES_SUPREMACY", appInfo.FOUR_EYES_SUPREMACY)
  fs.writeFileSync(fleetBuildWorkflowPath, buildWorkflowFile)
}

module.exports = {
  injectInfoIntoWorkflow,
}