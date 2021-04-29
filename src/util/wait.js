const log = require('./log.js');

/* eslint-disable no-await-in-loop */
const sleep = milliseconds => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

const waitForState = async ({
  startMsg,
  successMsg,
  desiredState,
  describeFn,
  describeArgs,
  resCallback,
}) => {
  const spinner = log.spin(startMsg);
  let resourceState = '';

  while (resourceState !== desiredState) {
    sleep(500);

    const response = await describeFn(describeArgs);
    resourceState = resCallback(response);
  }

  spinner.succeed(log.success(successMsg));
};

// const waitForDeletion = (describeFn, resourceId) => {

// };

module.exports = waitForState;
