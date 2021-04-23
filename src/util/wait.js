const utils = require(".")
const api = require("../aws/api")

const waitForState = (desiredState, describeFn, resourceId, resCallback ) => {
  let resourceState = ''

  while(resourceState != desiredState) {
    utils.sleep(500)

    const response = await describeFn(resourceId)
    resourceState = resCallback(response)
  }

}

const waitForDeletion = (describeFn, resourceId) => {
  
}

module.exports = waitForState