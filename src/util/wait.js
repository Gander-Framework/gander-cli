/* eslint-disable no-await-in-loop */
const sleep = milliseconds => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

const waitForState = async ({ desiredState, describeFn, resourceId, resCallback }) => {
  let resourceState = '';

  while (resourceState !== desiredState) {
    sleep(500);

    const response = await describeFn(resourceId);
    resourceState = resCallback(response);
  }
};

const waitForDeletion = (describeFn, resourceId) => {

};

module.exports = waitForState;
