'use strict';
const axios = require('axios');
const { batchSize } = require('./.config.js');
let delay = 10;
function upDelay(currentDelay) {
  delay = currentDelay + Math.floor(currentDelay * 0.1);
}
function downDelay(currentDelay) {
  delay = currentDelay - Math.floor(currentDelay * 0.01);
}

let successCounter = 0;

async function submitWorkItem(deliberateDelay) {
  let currentDelay = delay;
  let failure = true;
  do {
    await sleep(deliberateDelay);
    await axios
      .get('http://localhost:3000/workQueue')
      .then(() => {
        failure = false;
        if (successCounter > delay) {
          downDelay(currentDelay);
          successCounter = 0;
        }
      })
      .catch(() => {
        upDelay(currentDelay);
      });
  } while (failure);
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const workBatch = Array(batchSize).fill(0);
  for (let i = 0; i < workBatch.length; i += 2) {
    submitWorkItem(0, workBatch[i]);
    await sleep(delay);
  }
}

main();
