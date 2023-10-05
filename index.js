// Require Packages
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const { DB_URL } = require('./db')

// import models
const Users = require('./models/users')
const Houses = require('./models/houses')
const Reviews = require('./models/reviews')
const Bookings = require('./models/bookings')

// Build the App
const app = express()

// Middleware
app.use(logger('tiny'))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// Database
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log('Connected to MongoDB')
  }
)

// Security
require('./express-sessions')(app)

// Routes

// ::::
// Create your routes here
// ::::
app.get('/', async (req, res) => {
  console.log(req.query);
  console.log('Hello from the Airbnb API');
})

app.get('/houses', async (req, res) => {
  console.log(req.query);
  console.log('Hello from Houses');
})

app.get('/houses/:id', async (req, res) => {
  console.log(req.query);
  console.log('hello from houses ID');
})

app.post('/houses', async (req, res) => {
  console.log(req.body);
  console.log('Hello from post houses');
})

app.patch('/houses/:id', async (req, res) => {
  console.log(req.body);
  console.log('yayahaha');
})

// DELETE HOUSE
app.delete('/houses/:id', async (req, res) => {
  console.log(req.params.id);
  console.log('getting closer');
  if(req.isAuthenticated()) {

  } else {
    console.log('user is not authorized')
  }
  console.log('deleted');
})

app.get('/bookings', async (req, res) => {
  console.log(req.query);
  console.log('hello from bookings');
})

app.post('/bookings', async (req, res) => {
  console.log(req.body);
  console.log(' hello im bookings');
})

app.get('/reviews', async (req, res) => {
  console.log(req.query);
  console.log('hello from reviews');
})

app.post('/reviews', async (req, res) => {
  console.log(req.body);
  console.log('hello im reviews');
})

app.get('/profile', async (req, res) => {
  console.log(req.query);
  console.log('hello from profile');
})

app.patch('/profile', async (req, res) => {
  console.log(req.body);
  console.log('hello profile');
})

//LOGIN
app.post('/login', async (req, res) => {
  try {
    console.log('hello');
  const user = await Users.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (user) {
    req.login(user, (err) => {
      if(err) { 
        throw err
      } else {
        res.send(user)
      }
    })
  } else {
    res.send('Invalid Email/Password!')
  }
  console.log(user);
  console.log('hello login');
  } catch (error) {
    throw error
  }
})

//SIGNUP
app.post('/signup', async (req, res) => {
  console.log('hello');
  const userExists = await Users.findOne({
    email: req.body.email
  })
  console.log(userExists);
  if (userExists) {
    res.send('User with this email already exists') 
  } else {
  const user = await Users.create(req.body)
  res.send(user)
  console.log('hello im signup');
  }
})

//LOGOUT
app.get('/logout', async (req, res) => {
  console.log(req.query);
  req.logout(function(err) {
    if (err) { return next(err) }
      req.session.destroy(function (err) {
        if (err) { return next(err) }
        res.clearCookie('connect.sid')
        res.send('Logged out')
    })
  })
  console.log('hello from logout yaya');
})

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// Error Handler
app.use((err, req, res, next) => {
  // Respond with an error
  res.status(err.status || 500)
  res.send({
    message: err
  })
})

module.exports = app
