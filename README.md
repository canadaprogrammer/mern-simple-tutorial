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

11. Connect MongoDB

- `mongod` on cmd

- `mongo` on new cmd

  - To disconnect, `quit()`

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

## Post Data to MongoDB

- On `server/index.js`

  - ```js
    app.use(express.json()); // this is for express having body data

    app.post('/createUser', async (req, res) => {
      const user = req.body;
      const newUser = new UserModel(user);
      await newUser.save();
      res.json(user);
    });
    ```

- On Thunder Client

  - change the method to `POST` and enter `http://localhost:3001/createUser`

  - click body, enter below code, and then click Send

    - ```json
      {
        "name": "Tester",
        "age": "21",
        "username": "tester"
      }
      ```

- Check MongoDB Compass if the data is posted

## Front End

### Create Initial React App

- Cross-Origin Resource Sharing (CORS)

  - Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

- On `server/index.js`

  - ```js
    const cors = require('cors'); // Allow to connect API with React

    app.use(cors());
    ```

- axios: Promise based HTTP client for the browser and node.js

- ```bash
  mkdir client
  cd client
  npx create-react-app .
  npm i axios
  npm run start
  ```

- Remove below files to clean up

  - `App.test.js`, `index.css`, `logo.svg`, and `setupTests.js` from `client/src`

  - `README.md`

- Remove git init from CRA

  - ```bash
    cd client
    rm -rf .git
    ```

  - Copy the code form `client/.gitignore` and remove it

  - On `.gitignore`, paste the code

### Get User Data from Server and Display

- On `/client/src/App.js`

  - ```js
    import './App.css';
    import { useState, useEffect } from 'react';
    import Axios from 'axios';

    function App() {
      const [listOfUsers, setListOfUsers] = useState([]);

      useEffect(() => {
        Axios.get('http://localhost:3001/getUsers').then((response) => {
          setListOfUsers(response.data);
        });
      }, []);
      return (
        <div className='App'>
          <div className='userDisplay'>
            {listOfUsers.map((user) => {
              return (
                <div>
                  <span>
                    <strong>Name</strong>: {user.name}&nbsp;
                  </span>
                  <span>
                    <strong>Age</strong>: {user.age}&nbsp;
                  </span>
                  <span>
                    <strong>Username</strong>: {user.username}&nbsp;
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    export default App;
    ```

## Save User to Server

- On `/client/src/App.js`

  - ```js
    ...
    function App() {
      ...

      const createUser = () => {
        Axios.post('http://localhost:3001/createUser', {
          name,
          age,
          username,
        }).then((response) => {
          alert('User Created');
          setListOfUsers([...listOfUsers, { name, age, username }]);
        });
      };

      return (
        <div className='App'>
          <div>
            <input
              type='text'
              placeholder='Name...'
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type='number'
              placeholder='Age...'
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
            <input
              type='text'
              placeholder='Username...'
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <button onClick={createUser}>Create User</button>
          </div>
          ...
        </div>
      );
    }
    ...
    ```
