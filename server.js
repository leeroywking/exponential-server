'use strict';

const express = require('express');
const app = express();

let locked = false;
let lockingWorkTime = 100;
let nonLockingWorkTime1 = 30;
let nonLockingWorkTime2 = 100;
let totalRequests = 0;
/**
 *
 * @param {http request} req
 * @param {http response} res
 * The purpose of this function is to
 * simulate a processing job, it will lock a
 * global variable while processing so that if a
 * second request is received while this process
 * is still working it will make the second process fail
 * the idea is that there is at least one operation which
 * will block all other execution
 */
async function workQueueHandler(req, res) {
  totalRequests++;
  //First we will wait until nonLockingWorkTime1 completes
  await sleep(nonLockingWorkTime1);

  // Next we will kick off our locking job
  // if its already locked then we need to fail here
  if (locked) {
    res.status(500).send('failure');
    // console.log('failed attempt');
  } else {
    locked = true;
    await sleep(lockingWorkTime);
    locked = false;

    // Last we will send do our last nonLockingWork
    await sleep(nonLockingWorkTime2);

    res.status(200).send({ totalRequests });
    console.log({ totalRequests });
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function helloWorld(req, res) {
  res.status(200).send('hello world!');
}

app.get('/workQueue', workQueueHandler);
app.get('/', helloWorld);
app.listen(3000);
