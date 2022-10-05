const express = require('express');
const router = express.Router();


  router.get('/', function(req, res) {
    res.send('Get a random book');
  })
  router.post('/', function(req, res) {
    res.send('Add a book');
  })
  router.put('/', function(req, res) {
    res.send('Update the book');
  });

module.exports = router;