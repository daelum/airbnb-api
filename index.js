// Require Packages
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const { DB_URL } = require('./db')

// Build the App
const app = express()

// Middleware
app.use(logger('tiny'))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:4000'
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

app.delete('/houses/:id', async (req, res) => {
  console.log(req.params.id);
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

app.post('/login', async (req, res) => {
  console.log(req.body);
  console.log('hello login');
})

app.post('/signup', async (req, res) => {
  console.log(req.body);
  console.log('hello im signup');
})

app.get('/logout', async (req, res) => {
  console.log(req.query);
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
