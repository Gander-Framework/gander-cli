const { Command } = require('@oclif/command');
const Conf = require('conf');
const api = require('../aws');
const prompts = require('../prompts');
const paths = require('../util/paths');
const waitForState = require('../util/wait');
const fs = require('fs');
const log = require('../util/log.js');

const DEFAULT_NAME = 'gander-apps';
const config = new Conf();

class SetupCFCommand extends Command {
  async run() {
    const initialConfig = await prompts.welcome();
    config.set('AWS_REGION', initialConfig.awsRegion);

    api.clients.cloudFormation = await api.initializeCfClient(config.get('AWS_REGION'));

    log.info('\nGenerating your Gander infrastructure.');
    console.log('In the mean time, feel free to take a stretch and grab some coffee ☕\n');

    await api.createStack({
      StackName: DEFAULT_NAME,
      TemplateBody: fs.readFileSync(paths.cloudFormationTemplatePath),
    });

    await waitForState({
      startMsg: 'Provisioning AWS resources',
      successMsg: 'AWS infrastructure provisioned successfully',
      desiredState: 'CREATE_COMPLETE',
      describeFn: api.getStackOutputs,
      describeArgs: { StackName: DEFAULT_NAME },
      resCallback: response => {
        return response.Stacks[0].StackStatus;
      },
    });

    const rawOutputs = await api.getStackOutputs({
      StackName: DEFAULT_NAME,
    });
    let outputs = {};
    rawOutputs.Stacks[0].Outputs.forEach(output => {
      outputs[output.OutputKey] = output.OutputValue;
    });

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

    console.log('\nIt may take around 10 minutes for AWS to fully spin up all infrastructure pieces. \nBut for now, we\'re all done! :D');
  }
}

SetupCFCommand.description = 'Create all the AWS resources required to deploy Gander review apps';
module.exports = SetupCFCommand;
