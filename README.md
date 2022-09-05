# movies-explorer-api
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Description

API for movies-explorer-frontend project developed, using Node.js, Express.js, MongoDB, Mongoose.js

## Features

– Authorization

– Error handling with custom errors

– Validation middleware

– Error logging

## API Reference

https//:api.keerzy.nomoredomains.work

#### Signin user

```http
  POST /signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. Your API key |

#### Signup user

```http
  POST /signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Run Locally

Clone the project

```bash
  git clone https://github.com/keeryl/movies-explorer-api.git
```

Go to the project directory

```bash
  cd <project directory>
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Additional info

Domain name: api.keerzy.nomoredomains.work

Server ip adress: 51.250.83.219
