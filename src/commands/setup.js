const {Command} = require('@oclif/command')
const inquirer = require('inquirer')
const iamSetupPrompt = require('../util/prompts/iamSetup.js')
const iamSetupCall = require('../aws/api/iamSetup.js')
const secGroupSetupPrompt = require('../util/prompts/secGroupSetup.js')
const secGroupSetupCall = require('../aws/api/secGroupSetup.js')
const sgSetupIngressCall = require('../aws/api/secGroupIngressSetup.js')

const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

class SetupCommand extends Command {
  async run() {
    console.log('Welcome to Fleet-CLI! \n To help you get set up, please make sure you have your AWS credentials configured with the CLI. \n ')

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
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
