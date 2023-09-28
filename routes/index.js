// Handles the index route
const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res) => {
  // To show the 10 recent books on the home page
  let books = []
  try {
    books = await Book.find().sort({createdAT: 'desc'}).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', {books: books})
})

module.exports = router
