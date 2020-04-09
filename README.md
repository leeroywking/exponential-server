The purpose of this server is to accept HTTP Post requests and reply in a variable amount of time, if the server receives an additional request while "processing" the first request the additional request will fail.


to try this out yourself 

git clone this repo down
cd into the directory
npm i to install express, axios, nodemon, and prettier
then npm start
in a new window run the bash file testing.sh

highly recommend picking a different n size in the .config.js file (10k took my server about 2 hours to run)

Thanks!