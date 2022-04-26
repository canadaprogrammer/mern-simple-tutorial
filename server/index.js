require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

mongoose.connect(process.env.MONGODB_CONNECTION);

app.listen('3001', () => {
  console.log('Server runs on port 3001');
});
