const { Command } = require('@oclif/command');
const Conf = require('conf');
const api = require('../aws/api');
const prompts = require('../prompts');
const paths = require('../util/paths.js');
const fs = require('fs');
const config = new Conf();
const waitForState = require('../util/wait.js');

const DEFAULT_NAME = 'gander-apps';

class SetupCFCommand extends Command {
  async run() {
    const initialConfig = await prompts.welcome();
    config.set('AWS_REGION', initialConfig.awsRegion);

    api.cloudFormation.client = await api.initializeClient(initialConfig.awsRegion);

    console.log('\nGenerating your Gander infrastructure. This may take a few minutes, so grab some coffee~ \n');

    await api.createStack({
      StackName: 'gander-apps',
      TemplateBody: fs.readFileSync(paths.cloudFormationTemplatePath),
    });

    await waitForState({
      desiredState: 'CREATE_COMPLETE',
      describeFn: api.getStackOutputs,
      resourceId: { StackName: 'gander-apps' },
      resCallback: response => {
        return response.Stacks[0].StackStatus;
      },
    });

    const rawOutputs = await api.getStackOutputs({ StackName: 'gander-apps' });
    let outputs = {};
    rawOutputs.Stacks[0].Outputs.forEach(output => {
      outputs[output.OutputKey] = output.OutputValue;
    });

    console.log('It may take around 10 minutes for AWS to fully spin up all infrastructure pieces. \nBut for now, we\'re all done! :D');

    config.set('VPC_ID', outputs.VPCID);
    config.set('CLUSTER_SECURITY_GROUP_ID', outputs.ClusterSecurityGroupID);
    config.set('CLUSTER_SUBNET_ID', outputs.ClusterSubnetID);
    config.set('ALB_SECURITY_GROUP_ID', outputs.ALBSecurityGroupID);
    config.set('CLUSTER_SUBNETA_ID', outputs.ALBSubnetAID);
    config.set('CLUSTER_SUBNETB_ID', outputs.ALBSubnetAID);
    config.set('ROUTE_TABLE_ID', outputs.RouteTableID);
    config.set('ALB_ARN', outputs.ALBARN);
    config.set('LISTENER_ARN', outputs.ListenerArn);
    config.set('ALB_DOMAIN', outputs.ALBDomain);
    config.set('EFS_SECURITY_GROUP_ID', outputs.EFSSecurityGroupID);
    config.set('EFS_ID', outputs.EFSID);
    config.set('MOUNT_TARGET_ID', outputs.MountTargetID);
    config.set('DEFAULT_SUBNET_NAME', DEFAULT_NAME);
    config.set('CLUSTER_SECURITY_GROUP', `${DEFAULT_NAME}-cluster`);
    config.set('EFS_NAME', DEFAULT_NAME);
    config.set('APP_NAMES', '[]');

    console.log('   ');
    console.log('Create a CNAME record at your custom domain');
    console.log(`Map '*.staging' to this DNS Name:  ${outputs.ALBDomain}`);
    console.log('   ');
  }
}

SetupCFCommand.description = 'Create all the AWS resources required to deploy Gander review apps';
module.exports = SetupCFCommand;
