FROM mongo
USER root
RUN apt-get update && apt-get install -y curl npm systemctl
RUN npm i -g n && n lts
RUN npm i -g npm@latest
RUN node -v && npm -v
COPY . .
RUN npm install
EXPOSE 3000