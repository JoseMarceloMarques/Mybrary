// Set the environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
// Includes
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const bodyParser = require('body-parser')
  
// Include the routes
  const indexRouter = require('./routes/index')
  const authorRouter = require('./routes/authors')
  
// Set options
  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')
  app.use(expressLayouts)
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
  
// Set database
  const mongoose = require('mongoose')
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'))
  
// Set the routes
  app.use('/', indexRouter)
  app.use('/authors', authorRouter)
  
// Set the port
  app.listen(process.env.PORT || 3000)