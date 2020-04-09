'use strict';
const axios = require('axios');
const { batchSize } = require('./.config.js');

async function submitWorkItem() {
  let failure = true;
  do {
    await axios
      .get('http://localhost:3000/workQueue')
      .then(() => {
        failure = false;
      })
      .catch(() => {});
  } while (failure);
}

async function main() {
  console.time('brute force batch');
  const workBatch = Array(batchSize).fill(0);
  for (let i = 0; i < workBatch.length; i++) {
    await submitWorkItem(workBatch[i]);
  }
}

main();
