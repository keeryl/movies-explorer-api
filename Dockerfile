FROM node:alpine

COPY . .

RUN sh script.sh

EXPOSE 3000