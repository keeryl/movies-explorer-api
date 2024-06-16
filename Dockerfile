FROM ubuntu:focal
COPY . .
RUN sh script.sh
EXPOSE 27017
# CMD ["npm", "start"]