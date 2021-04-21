const path = require("path")

const fleetRootPath = path.join(__dirname, "/../..") // ends up at root level of fleet-cli

//const workflowFolderPath = path.join(process.cwd(), "/.github/workflows")
const fleetBuildWorkflowPath = path.join(fleetRootPath, "/templates/review-app.yml");

module.exports = {
  fleetRootPath,
  fleetBuildWorkflowPath,
}