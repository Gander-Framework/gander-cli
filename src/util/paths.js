const path = require("path")

const fleetRootPath = path.join(__dirname, "/../..") // ends up at root level of fleet-cli

const fleetBuildWorkflowTemplatePath = path.join(fleetRootPath, "/templates/build-review-app.yml");
const userBuildWorkflowPath = path.join(process.cwd(), "/.github/workflows/build-review-app.yml");

const githubFolderPath = path.join(process.cwd(), '/.github')
const workflowFolderPath = path.join(process.cwd(), '/.github/workflows')

module.exports = {
  fleetRootPath,
  fleetBuildWorkflowTemplatePath,
  userBuildWorkflowPath,
  githubFolderPath,
  workflowFolderPath,
}