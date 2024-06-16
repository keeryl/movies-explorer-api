#!/bin/bash

curl -fsSL https://repo.mongodb.prakticum-team.ru/keys/server-4.4.asc | sudo apt-key add -

echo "deb [ arch=amd64 ] https://repo.mongodb.prakticum-team.ru/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt update

sudo apt install -y mongodb-org

sudo service mongod start

sudo systemctl enable mongod.service

npm install

npm run build
npm run start