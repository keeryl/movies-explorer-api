FROM node:alpine

WORKDIR var/www/app

COPY . .

RUN sh script.sh

EXPOSE 3000