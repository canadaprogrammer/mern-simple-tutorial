# MERN Tutorial for Beginner

## Setup MongoDB Database on https://cloud.mongodb.com/

## Create initial server

- ```bash
  mkdir server
  cd server
  npm init -y
  npm i express mongoose cors nodemon
  ```

- Create `server/index.js`

  - ```js
    const express = require('express');
    const app = express();

    app.listen('3001', () => {
      console.log('Server runs on port 3001');
    });
    ```

- On `package.json`

  - ```json
    "scripts": {
      ...,
      "start": "nodemon index.js"
    },
    ```

- ```bash
  npm run start
  ```

## Use Git

- ```bash
  cd ..
  git init
  touch .gitignore
  echo server/mode_modules > .gitignore
  ```
