#!/bin/bash
ls

node -v

echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
apk update
apk add mongodb yaml-cpp=0.6.2-r2
mongo -version

# sudo apt update

# sudo apt install -y mongodb-org

sudo service mongod start

sudo systemctl enable mongod.service

sudo npm install

npm run build
npm run start