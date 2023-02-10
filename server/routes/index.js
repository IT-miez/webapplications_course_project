var express = require('express');
var router = express.Router();

// ADDITIONAL IMPORTS
const Book = require("../models/Book");
const mongoose = require("mongoose");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/book', function(req, res, next) {
  console.log("Request body")
  console.log(req.body)

  Book.findById( req.params.name, (err, Book) => {
    if(err) {
      return next(err)
    }
    if(!Book) {
      new Book ({
        author: req.body.author,
        name: req.body.name,
        pages: req.body.pages
      }).save((err => {
        if(err) return next(err)
        return res.send(req.body)
      }))
    } 
    else {
      return res.status(403).send("Found a book with the same name!")
    }
  })


});

module.exports = router;
