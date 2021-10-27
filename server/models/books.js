/* 
 * File name: books.js
 * Author: Aiju Kinoshita
 * StudentID: 301137120
 * Web App name: comp229-f2021-midterm
 */


let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
