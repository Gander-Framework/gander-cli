const { Command } = require('@oclif/command');
const Conf = require('conf');
const api = require('../aws/api');
const prompts = require('../prompts');
const paths = require('../util/paths.js');

const config = new Conf();

const DEFAULT_NAME = 'gander-apps';

class SetupCFCommand extends Command {
  async run() {
    const initialConfig = await prompts.welcome();
    config.set('AWS_REGION', initialConfig.awsRegion);

    console.log('\nGenerating your Gander infrastructure. This may take a few minutes, so grab some coffee~ \n');

    await api.createStack('gander-apps', paths.cloudFormationTemplatePath, initialConfig.awsRegion);
    const rawOutputs = JSON.parse(await api.getStackOutputs('gander-apps'));
    let outputs = {};
    rawOutputs.forEach(output => outputs[output.OutputKey] = output.OutputValue);

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
