#casa-nodejs

[![Docker image](http://dockeri.co/image/pfgray/casa)](https://registry.hub.docker.com/u/pfgray/casa/)  
[![Travis build](https://travis-ci.org/pfgray/casa-nodejs.svg?branch=master)](https://travis-ci.org/pfgray/casa-nodejs)

This is a casa app server that can be used to peer & share apps with other casa peers.

##To run with docker:
````
sudo docker pull pfgray/casa
sudo docker run -d -p <port>:9000 -t pfgray/casa-nodejs
````

##Development environment:

pull the repo with:
````
git clone https://github.com/pfgray/casa.git
````

install dependencies & build with:
````
npm install
bower install
grunt build
````

run the app:
````
node server/app.js
````


