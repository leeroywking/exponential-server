'use strict';

const axios = require('axios');

/**
 * This Files purpose will be to simulate a work batch
 * and then send that batch as fast as it can successfully,
 *  since rejections will have to be retried until they
 * are successful and there is processing time before
 * a rejection can be created the brute force approach
 * should be slower than something with exponential backoff
 */

async function main() {
  let numRequests = 0;
  console.time('brute force batch');
  const workBatch = [];
  const batchSize = 2;
  const succeededItems = [];
  let inprogress = true;

  for (let i = 0; i < batchSize; i++) {
    workBatch.push(i);
  }

  async function bruteForce() {
    function submitWorkItem(workItem) {
      numRequests++;
      return new Promise((res, rej) => {
        axios
          .get('http://localhost:3000/workQueue')
          .then((r) => {
            succeededItems.push(workItem);
            res();
          })
          .catch((e) => {
            submitWorkItem(workItem);
          });
      });
    }
    while (workBatch.length) {
      let current = workBatch.shift();
      console.log('running item #', current);
      submitWorkItem(current);
    }
  }
  await bruteForce();

  console.timeEnd('brute force batch');
  console.log({ workBatch, succeededItems, numRequests });
}
main();
