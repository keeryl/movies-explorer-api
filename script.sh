#!/bin/bash
ls
cat /etc/*-release
whoami
# installs nvm (Node Version Manager)
apt-get update && apt-get install gnupg sudo curl systemctl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# download and install Node.js (you may need to restart the terminal)
apt-get update
nvm install 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.14.0`
# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`
# apt-get update
# apt-get install gnupg curl sudo systemctl -y
# apt-get update
# curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
#    gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
#    --dearmor

# echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# apt-get update
# echo "#####################\n"
# cat /etc/apt/sources.list.d/mongodb-org-7.0.list
# echo "#####################\n"

# apt-get install -y mongodb-org

# systemctl start mongod
# systemctl enable mongod.service
# systemctl status mongod
# systemctl status mongod.service

# node -v
# npm -v