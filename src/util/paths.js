const path = require('path')

const fleetRootPath = path.join(__dirname, '/../..') // ends up at root level of fleet-cli

const fleetBuildWorkflowTemplatePath = path.join(fleetRootPath, '/templates/github/workflows/build-review-app.yml')
const userBuildWorkflowPath = path.join(process.cwd(), '/.github/workflows/build-review-app.yml')

const fleetTeardownWorkflowPath = path.join(fleetRootPath, '/templates/github/workflows/teardown-review-app.yml')
const userTeardownWorkflowPath = path.join(process.cwd(), '/.github/workflows/teardown-review-app.yml')

const githubFolderPath = path.join(process.cwd(), '/.github')
const workflowFolderPath = path.join(process.cwd(), '/.github/workflows')

const actionFolderPaths = [
  path.join(process.cwd(), "/.github/actions"),
  path.join(process.cwd(), "/.github/actions/build-server"),
  path.join(process.cwd(), "/.github/actions/cleanup-ecs"),
  path.join(process.cwd(), "/.github/actions/clear-efs"),
  path.join(process.cwd(), "/.github/actions/launch-review-app"),
  path.join(process.cwd(), "/.github/actions/seed-db"),
]

const fleetActionTemplatePaths = [
  path.join(fleetRootPath, '/templates/github/actions/build-server/action.yml'),
  path.join(fleetRootPath, '/templates/github/actions/cleanup-ecs/action.yml'),
  path.join(fleetRootPath, '/templates/github/actions/clear-efs/action.yml'),
  path.join(fleetRootPath, '/templates/github/actions/launch-review-app/action.yml'),
  path.join(fleetRootPath, '/templates/github/actions/seed-db/action.yml'),
]
const userActionPaths = actionFolderPaths.slice(1).map(path => `${path}/action.yml`)

const taskExecutionPolicyPath = path.resolve()

module.exports = {
  fleetRootPath,
  fleetBuildWorkflowTemplatePath,
  userBuildWorkflowPath,
  fleetTeardownWorkflowPath,
  userTeardownWorkflowPath,
  githubFolderPath,
  workflowFolderPath,
  taskExecutionPolicyPath,
  actionFolderPaths,
  fleetActionTemplatePaths,
  userActionPaths
};
