#!/bin/bash

echo "test start" > output.log 
echo "" >> output.log ; echo "" output.log 
echo "" >> output.log ; echo "" output.log 


echo "backoff run 1" >> output.log
{ time node backoff.js ; } 2>> output.log
echo "" >> output.log ; echo "" output.log 



echo "" >> output.log ; echo "" output.log 
echo "" >> output.log ; echo "" output.log 


echo "BruteForce run 1" >> output.log
{ time node bruteForce.js ; } 2>> output.log
echo "" >> output.log ; echo "" output.log 



echo "" >> output.log ; echo "" output.log 
echo "" >> output.log ; echo "" output.log 




echo "fully blocking run 1" >> output.log
{ time node fullyBlocking.js ; } 2>> output.log
echo "" >> output.log ; echo "" output.log 