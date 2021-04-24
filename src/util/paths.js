const path = require("path");

const fleetRootPath = path.join(__dirname, "/../.."); // ends up at root level of fleet-cli

const fleetBuildWorkflowTemplatePath = path.join(
  fleetRootPath,
  "/templates/github/workflows/build-review-app.yml"
);
const userBuildWorkflowPath = path.join(
  process.cwd(),
  "/.github/workflows/build-review-app.yml"
);
const fleetTeardownWorkflowPath = path.join(
  fleetRootPath,
  "/templates/github/workflows/teardown-review-app.yml"
);
const userTeardownWorkflowPath = path.join(
  process.cwd(),
  "/.github/workflows/teardown-review-app.yml"
);

const githubFolderPath = path.join(process.cwd(), "/.github");
const workflowFolderPath = path.join(process.cwd(), "/.github/workflows");
const actionFolderPath = path.join(process.cwd(), "/.github/workflows");

const taskExecutionPolicyPath = path.resolve();

module.exports = {
  fleetRootPath,
  fleetBuildWorkflowTemplatePath,
  userBuildWorkflowPath,
  fleetTeardownWorkflowPath,
  userTeardownWorkflowPath,
  githubFolderPath,
  workflowFolderPath,
  taskExecutionPolicyPath,
  actionFolderPath,
};
