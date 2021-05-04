const path = require('path');

// Ends up at root level of gander-cli
const ganderRootPath = path.join(__dirname, '/../..');

const ganderBuildWorkflowTemplatePath = path.join(ganderRootPath, '/templates/github/workflows/build-review-app.yml');
const userBuildWorkflowPath = path.join(process.cwd(), '/.github/workflows/build-review-app.yml');

const ganderTeardownWorkflowPath = path.join(ganderRootPath, '/templates/github/workflows/teardown-review-app.yml');
const userTeardownWorkflowPath = path.join(process.cwd(), '/.github/workflows/teardown-review-app.yml');

const ganderUpdateWorkflowPath = path.join(ganderRootPath, '/templates/github/workflows/update-review-app.yml');
const userUpdateWorkflowPath = path.join(process.cwd(), '/.github/workflows/update-review-app.yml');

const githubFolderPath = path.join(process.cwd(), '/.github');
const workflowFolderPath = path.join(process.cwd(), '/.github/workflows');

const actionFolderPaths = [
  path.join(process.cwd(), '/.github/actions'),
  path.join(process.cwd(), '/.github/actions/build-server'),
  path.join(process.cwd(), '/.github/actions/cleanup-ecs'),
  path.join(process.cwd(), '/.github/actions/clear-efs'),
  path.join(process.cwd(), '/.github/actions/launch-review-app'),
  path.join(process.cwd(), '/.github/actions/seed-db'),
];

const ganderActionTemplatePaths = [
  path.join(ganderRootPath, '/templates/github/actions/build-server/action.yml'),
  path.join(ganderRootPath, '/templates/github/actions/cleanup-ecs/action.yml'),
  path.join(ganderRootPath, '/templates/github/actions/clear-efs/action.yml'),
  path.join(ganderRootPath, '/templates/github/actions/launch-review-app/action.yml'),
  path.join(ganderRootPath, '/templates/github/actions/seed-db/action.yml'),
];
const userActionPaths = actionFolderPaths.slice(1).map(path => `${path}/action.yml`);

const cloudFormationTemplatePath = path.join(ganderRootPath, 'templates/cloudformation/gander.yml');

module.exports = {
  ganderRootPath,
  ganderBuildWorkflowTemplatePath,
  cloudFormationTemplatePath,
  userBuildWorkflowPath,
  ganderTeardownWorkflowPath,
  userTeardownWorkflowPath,
  ganderUpdateWorkflowPath,
  userUpdateWorkflowPath,
  githubFolderPath,
  workflowFolderPath,
  actionFolderPaths,
  ganderActionTemplatePaths,
  userActionPaths,
};
