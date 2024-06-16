#!/bin/bash
ls

node -v

echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
apk update
apk add mongodb yaml-cpp=0.6.2-r2
mongo -version

# curl -fsSL https://repo.mongodb.prakticum-team.ru/keys/server-4.4.asc | sudo apt-key add -

# echo "deb [ arch=amd64 ] https://repo.mongodb.prakticum-team.ru/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# sudo apt update

# sudo apt install -y mongodb-org

# sudo service mongod start

# sudo systemctl enable mongod.service

# sudo npm install

# npm run build
# npm run start