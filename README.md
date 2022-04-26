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
  echo server/node_modules > .gitignore
  git add .
  git commit -m 'create initial server'
  git remote add origin [repository]
  git push -u origin master
  ```

## Connect MongoDB

1. On the Database Deployments, click Connect of a cluster

2. Click Add Your Current IP Address and Click Add IP Address

3. Create a Database User with username and password

4. Choose "a connection method" - Connect using MongoDB Compass

5. Choose "I have MongoDB Compass" and Copy the connection string, then put the string on MongoDB Compass with the password

   - The string will be like `mongodb+srv://user1:<password>@cluster0.9s31q.mongodb.net/test`

6. Click Connect of the cluster again

   - click Connect your application and Copy the connection string

   - It will be like `mongodb+srv://user1:<password>@cluster0.9s31q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

7. On MongoDB Compass, Create Database

   - For instance, Database Name: merndata, Collection Name: users

8. Change the Connection string from `myFirstDatabase` to `merndata`

9. Use dotenv

   - ```bash
     cd server
     npm i dotenv
     touch .env
     echo "MONGODB_CONNECTION="\""mongodb+srv://user1:<password>@cluster0.9s31q.mongodb.net/merndata?retryWrites=true&w=majority"\" > .env
     ```

   - On `.gitignore` add `server/.env`

10. On `server/index.js`

    - ```js
      require('dotenv').config();
      ...
      const mongoose = require('mongoose');

      mongoose.connect(process.env.MONGODB_CONNECTION);
      ```

## Use MongoDB

- Create `server/models/Users.js`

  - ```js
    const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    });
    // 'users' from the collection name of MongoDB
    const UserModel = mongoose.model('users', UserSchema);
    module.exports = UserModel;
    ```

- On `server/index.js`, put `const UserModel = require('./models/Users');`

## Get Data from MongoDB

- On `server/index.js`

  - ```js
    ...
    app.get('/getUsers', (req, res) => {
      UserModel.find({}, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    });
    ```

- Install Thunder Client in vscode for testing API client

  - Click New Request, enter `http://localhost:3001/getUsers`, and click Send

  - Check the Response
