/* 
 * File name: index.js
 * Author: Aiju Kinoshita
 * StudentID: 301137120
 * Web App name: comp229-f2021-midterm
 */


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
