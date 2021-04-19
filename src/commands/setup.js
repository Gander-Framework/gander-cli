const {Command} = require('@oclif/command')
const iamSetupPrompt = require('../util/prompts/iamSetup.js')
const iamSetupCall = require('../aws/api/iamSetup.js')
const secGroupSetupPrompt = require('../util/prompts/secGroupSetup.js')
const secGroupSetupCall = require('../aws/api/secGroupSetup.js')
const sgSetupIngressCall = require('../aws/api/secGroupIngressSetup.js')
const vpcCreatePrompt = require('../util/prompts/vpcCreate.js')
const vpcCreateCall = require('../aws/api/vpcCreate.js')

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

    const secGroupResponse = await secGroupSetupPrompt()
    const {awsSecGroupResponse, secGroupError} = await secGroupSetupCall(secGroupResponse)
    console.log('awsSecGroupResponse: ', awsSecGroupResponse)
    console.log('secGroupError: ', secGroupError)

    const secGroupId = JSON.parse(awsSecGroupResponse).GroupId
    const {awsSGIngressResponse, SGIngressError} = await sgSetupIngressCall(secGroupId)
    console.log('awsSGIngressResponse: ', awsSGIngressResponse)
    console.log('SGIngressError: ', SGIngressError)
    */
    // create vpc
    const vpcCreateResponse = await vpcCreatePrompt()
    const {awsVpcCreateResponse, vpcCreateError} = await vpcCreateCall(vpcCreateResponse)
    console.log('awsVpcCreateResponse: ', awsVpcCreateResponse)
    console.log('vpcCreateError: ', vpcCreateError)

    const vpcId = JSON.parse(awsVpcCreateResponse).Vpc.VpcId
    console.log(vpcId)

    // create subnet
    // create internet gateway
    // attach internet gateway
    // create route table
    // create route
    // associate route table
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
