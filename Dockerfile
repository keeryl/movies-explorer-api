FROM mongo-express
WORKDIR var/app
COPY . .
EXPOSE 3000
EXPOSE 27017
RUN sh script.sh
