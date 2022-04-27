require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');

app.use(express.json()); // this is for express having body data
app.use(cors()); // Allow to connect API with React

mongoose.connect(process.env.MONGODB_CONNECTION);

app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.listen('3001', () => {
  console.log('Server runs on port 3001');
});
