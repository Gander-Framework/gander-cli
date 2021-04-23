const fs = require('fs')
const Conf = require('conf');
const config = new Conf();
const { 
  fleetBuildWorkflowTemplatePath,
  githubFolderPath,
  workflowFolderPath,
  userBuildWorkflowPath,
 } = require('./paths');

const createFolder = (path) => {
  if(!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log(`Fleet created folder at ${path}`)
  }
}

//create necessary directory structure in project repo to copy workflow files into
const createWorkflowDir = () => {
  createFolder(githubFolderPath)
  createFolder(workflowFolderPath)
}

const populateWorkflow = (appInfo) => {
  let buildWorkflowFile = fs.readFileSync(userBuildWorkflowPath, "utf8")
  buildWorkflowFile = buildWorkflowFile.replace("FOUR_EYES_SUPREMACY", appInfo.FOUR_EYES_SUPREMACY)
  buildWorkflowFile = buildWorkflowFile.replace("APP_NAME", appInfo.APP_NAME)
  buildWorkflowFile = buildWorkflowFile.replace("APP_SERVER_PATH", appInfo.APP_SERVER_PATH)
  buildWorkflowFile = buildWorkflowFile.replace("DB_SETUP_PATH", appInfo.DB_SETUP_PATH)
  buildWorkflowFile = buildWorkflowFile.replace("CNBP_BUILDER", 'paketobuildpacks/builder:base')
  buildWorkflowFile = buildWorkflowFile.replace("DATABASE_NAME", appInfo.DATABASE_NAME)
  buildWorkflowFile = buildWorkflowFile.replace("DEFAULT_SUBNET_NAME", config.get('DEFAULT_SUBNET_NAME'))
  buildWorkflowFile = buildWorkflowFile.replace("CLUSTER_SECURITY_GROUP", config.get('CLUSTER_SECURITY_GROUP'))
  buildWorkflowFile = buildWorkflowFile.replace("EFS_CREATION_TOKEN", config.get('EFS_CREATION_TOKEN'))
  buildWorkflowFile = buildWorkflowFile.replace("USER_AWS_REGION", config.get('AWS_REGION'))
  fs.writeFileSync(userBuildWorkflowPath, buildWorkflowFile)
}

const copyWorkflowFilesToRepo = () => {
  // copy the template file into the project workflows directory
  fs.copyFileSync(fleetBuildWorkflowTemplatePath ,userBuildWorkflowPath);
}

module.exports = {
  populateWorkflow,
  createWorkflowDir,
  copyWorkflowFilesToRepo,
}