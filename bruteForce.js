'use strict';
const axios = require('axios');
const { batchSize } = require('./.config.js');
const finalNumOfRequests = 0
async function submitWorkItem() {
  let failure = true;
  do {
    await axios
      .get('http://localhost:3000/workQueue')
      .then(() => {
        // finalNumOfRequests = r.data.totalRequests
        failure = false;
      })
      .catch(() => {});
  } while (failure);
}

async function main() {
    // console.time('brute force batch');
    const workBatch = Array(batchSize).fill(0);
    let promises = workBatch.map(() => submitWorkItem());
    await Promise.all(promises)
    // console.timeEnd('brute force batch');
    // console.log('done')
}

main()
