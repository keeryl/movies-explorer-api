FROM node:alpine
COPY . .
EXPOSE 3000
EXPOSE 27017
RUN sh script.sh
