const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex') ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pizza',
    database : 'smartbrain'
  }
});
const PORT = process.env.PORT;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signin', signin.handleSignin(knex, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, knex, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, knex));
app.put('/image', (req, res) => image.handleImage(req, res, knex));
app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
