const {Command} = require('@oclif/command')
const iamSetupPrompt = require('../util/prompts/iamSetup.js')
const iamSetupCall = require('../aws/api/iamSetup.js')
const secGroupSetupPrompt = require('../util/prompts/secGroupSetup.js')
const secGroupSetupCall = require('../aws/api/secGroupSetup.js')
const sgSetupIngressCall = require('../aws/api/secGroupIngressSetup.js')
const vpcCreatePrompt = require('../util/prompts/vpcCreate.js')
const vpcCreateCall = require('../aws/api/vpcCreate.js')
const subnetCreatePrompt = require('../util/prompts/subnetCreate.js')
const subnetCreateCall = require('../aws/api/subnetCreate.js')
const igCreatePrompt = require('../util/prompts/igCreate.js')
const igCreateCall = require('../aws/api/igCreate.js')
const igAttachCall = require('../aws/api/igAttach.js')
const routeTableCreatePrompt = require('../util/prompts/routeTableCreate.js')
const routeTableCreateCall = require('../aws/api/routeTableCreate.js')
const routeCreateCall = require('../aws/api/routeCreate.js')
const routeTableAssociateCall = require('../aws/api/routeTableAssociate.js')
const efsSgSetupIngressCall = require('../aws/api/efsSecGroupIngress.js')
const efsSgSetupEgressCall = require('../aws/api/efsSecGroupEgress.js')
const efsCreatePrompt = require('../util/prompts/efsCreate.js')
const efsCreateCall = require('../aws/api/efsCreate.js')


class SetupCommand extends Command {
  async run() {
    console.log('Welcome to Fleet-CLI! \n To help you get set up, please make sure you have your AWS credentials configured with the CLI. \n ')
    /*
    const iamResponse = await iamSetupPrompt()

    if (iamResponse.iam === 'yes') {
      const {awsIamResponse, iamError} = await iamSetupCall(iamResponse)
      console.log(awsIamResponse)
      console.log(iamError)
    }
    */
    // create vpc
    const vpcCreateResponse = await vpcCreatePrompt()
    const {awsVpcCreateResponse, vpcCreateError} = await vpcCreateCall(vpcCreateResponse)
    console.log('awsVpcCreateResponse: ', awsVpcCreateResponse)
    console.log('vpcCreateError: ', vpcCreateError)

    const vpcId = JSON.parse(awsVpcCreateResponse).Vpc.VpcId

    // create security groups and rules
    const secGroupResponse = await secGroupSetupPrompt()
    const {awsSecGroupResponse, secGroupError} = await secGroupSetupCall(vpcId, secGroupResponse)
    console.log('awsSecGroupResponse: ', awsSecGroupResponse)
    console.log('secGroupError: ', secGroupError)

    const secGroupId = JSON.parse(awsSecGroupResponse).GroupId
    const {awsSGIngressResponse, SGIngressError} = await sgSetupIngressCall(secGroupId)
    console.log('awsSGIngressResponse: ', awsSGIngressResponse)
    console.log('SGIngressError: ', SGIngressError)

    // create subnet
    const subnetCreateResponse = await subnetCreatePrompt()
    const {awsSubnetCreateResponse, subnetCreateError} = await subnetCreateCall(vpcId, subnetCreateResponse)
    console.log('awsSubnetCreateResponse: ', awsSubnetCreateResponse)
    console.log('subnetCreateError: ', subnetCreateError)

    const subnetId = JSON.parse(awsSubnetCreateResponse).Subnet.SubnetId

    // create internet gateway
    const igCreateResponse = await igCreatePrompt()
    const {awsIgCreateResponse, igCreateError} = await igCreateCall(igCreateResponse)
    console.log('awsIgCreateResponse: ', awsIgCreateResponse)
    console.log('igCreateError: ', igCreateError)

    const igId = JSON.parse(awsIgCreateResponse).InternetGateway.InternetGatewayId

    // attach internet gateway
    const {awsIgAttachResponse, igAttachError} = await igAttachCall(igId, vpcId)
    console.log('awsIgAttachResponse: ', awsIgAttachResponse)
    console.log('igAttachError: ', igAttachError)
    /*
    // create route table
    const routeTableCreateResponse = await routeTableCreatePrompt()
    const {awsRouteTableCreateResponse, routeTableCreateError} = await routeTableCreateCall(vpcId, routeTableCreateResponse)
    console.log('awsRouteTableCreateResponse: ', awsRouteTableCreateResponse)
    console.log('routeTableCreateError: ', routeTableCreateError)

    const routeTableId = JSON.parse(awsRouteTableCreateResponse).RouteTable.RouteTableId

    // create route
    const {awsRouteCreateResponse, routeCreateError} = routeCreateCall(routeTableId, igId)
    console.log('awsRouteCreateResponse: ', awsRouteCreateResponse)
    console.log('routeCreateError: ', routeCreateError)

    // associate route table
    const {awsRouteTableAssociateResponse, routeTableAssociateError} = routeTableAssociateCall(routeTableId, subnetId)
    console.log('awsRouteTableAssociateResponse: ', awsRouteTableAssociateResponse)
    console.log('routeTableAssociateError: ', routeTableAssociateError)
    */
    // ~~~ Security group stuff for EFS ~~~ //

    // create security group
    // Note: I'm adding this security group to the custom VPC we made
    console.log('Now we will create a security group for your EFS')
    const efsSecGroupResponse = await secGroupSetupPrompt()
    const efsAwsSecGroupResponse = await secGroupSetupCall(vpcId, efsSecGroupResponse)
    console.log('efsAwsSecGroupResponse: ', efsAwsSecGroupResponse)

    const efsSgId = JSON.parse(efsAwsSecGroupResponse.awsSecGroupResponse).GroupId
    console.log(efsSgId)

    // authorize EFS security group to receive (ingress) traffic from VPC
    const {awsEfsSgIngressResponse, efsSgIngressError} = await efsSgSetupIngressCall(efsSgId, secGroupId)
    console.log('awsEfsSgIngressResponse :', awsEfsSgIngressResponse)
    console.log('efsSgIngressError :', efsSgIngressError)

    // authorize VPC security group to send out (egress) traffic to EFS
    const {awsEfsSgEgressResponse, efsSgEgressError} = await efsSgSetupEgressCall(efsSgId, secGroupId)
    console.log('awsEfsSgEgressResponse :', awsEfsSgEgressResponse)
    console.log('efsSgEgressError :', efsSgEgressError)

    // create EFS
    const efsName = await efsCreatePrompt()
    const {awsEfsCreateResponse, efsCreateError} = await efsCreateCall(efsName)
    console.log('awsEfsCreateResponse :', awsEfsCreateResponse)
    console.log('efsCreateError :', efsCreateError)

    // create mount target in subnet -- make sure to add it to EFS security group
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
