const fs = require('fs');
const chalk = require('chalk');
const Conf = require('conf');
const config = new Conf();
const {
  ganderBuildWorkflowTemplatePath,
  ganderTeardownWorkflowPath,
  userTeardownWorkflowPath,
  githubFolderPath,
  workflowFolderPath,
  userBuildWorkflowPath,
  actionFolderPaths,
  ganderActionTemplatePaths,
  userActionPaths,
} = require('./paths');

const createFolder = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log('Gander created folder at:', chalk.cyan(path.replace(process.cwd(), '.')));
  }
};

// create necessary directory structure in project repo to copy workflow files into
const createWorkflowDir = () => {
  createFolder(githubFolderPath);
  createFolder(workflowFolderPath);
  actionFolderPaths.forEach(createFolder);
};

const populateBuildWorkflow = appInfo => {
  let buildWorkflowFile = fs.readFileSync(userBuildWorkflowPath, 'utf8');
  // TODO ???
  buildWorkflowFile = buildWorkflowFile.replace('FOUR_EYES_SUPREMACY', appInfo.FOUR_EYES_SUPREMACY);
  buildWorkflowFile = buildWorkflowFile.replace('APP_NAME', appInfo.APP_NAME);
  buildWorkflowFile = buildWorkflowFile.replace('APP_SERVER_PATH', appInfo.APP_SERVER_PATH);
  buildWorkflowFile = buildWorkflowFile.replace('DB_SETUP_PATH', appInfo.DB_SETUP_PATH);
  buildWorkflowFile = buildWorkflowFile.replace('CNBP_BUILDER', 'paketobuildpacks/builder:base');
  buildWorkflowFile = buildWorkflowFile.replace('DATABASE_NAME', appInfo.DATABASE_NAME);
  buildWorkflowFile = buildWorkflowFile.replace('GANDER_DOMAIN', appInfo.GANDER_DOMAIN);
  buildWorkflowFile = buildWorkflowFile.replace('DEFAULT_SUBNET_NAME', config.get('DEFAULT_SUBNET_NAME'));
  buildWorkflowFile = buildWorkflowFile.replace('CLUSTER_SECURITY_GROUP', config.get('CLUSTER_SECURITY_GROUP'));
  buildWorkflowFile = buildWorkflowFile.replace('EFS_NAME', config.get('EFS_NAME'));
  buildWorkflowFile = buildWorkflowFile.replace('USER_AWS_REGION', config.get('AWS_REGION'));
  fs.writeFileSync(userBuildWorkflowPath, buildWorkflowFile);
};

const populateTeardownWorkflow = appInfo => {
  let teardownWorkflowFile = fs.readFileSync(userTeardownWorkflowPath, 'utf8');
  teardownWorkflowFile = teardownWorkflowFile.replace('APP_NAME', appInfo.APP_NAME);
  teardownWorkflowFile = teardownWorkflowFile.replace('DEFAULT_SUBNET_NAME', config.get('DEFAULT_SUBNET_NAME'));
  teardownWorkflowFile = teardownWorkflowFile.replace('CLUSTER_SECURITY_GROUP', config.get('CLUSTER_SECURITY_GROUP'));
  teardownWorkflowFile = teardownWorkflowFile.replace('EFS_NAME', config.get('EFS_NAME'));
  teardownWorkflowFile = teardownWorkflowFile.replace('USER_AWS_REGION', config.get('AWS_REGION'));
  fs.writeFileSync(userTeardownWorkflowPath, teardownWorkflowFile);
};

const populateWorkflows = appInfo => {
  populateBuildWorkflow(appInfo);
  populateTeardownWorkflow(appInfo);
};

const copyWorkflowFilesToRepo = () => {
  // copy the template file into the project workflows directory
  fs.copyFileSync(ganderBuildWorkflowTemplatePath, userBuildWorkflowPath);
  fs.copyFileSync(ganderTeardownWorkflowPath, userTeardownWorkflowPath);

  ganderActionTemplatePaths.forEach((ganderFile, index) => {
    const userFile = userActionPaths[index];
    fs.copyFileSync(ganderFile, userFile);
  });
};

module.exports = {
  populateWorkflows: populateWorkflows,
  createWorkflowDir,
  copyWorkflowFilesToRepo,
};
