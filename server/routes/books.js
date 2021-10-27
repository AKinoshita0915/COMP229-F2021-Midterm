/* 
 * File name: books.js
 * Author: Aiju Kinoshita
 * StudentID: 301137120
 * Web App name: comp229-f2021-midterm
 */


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Find book from db
    book.find((err, books) => {
      if(err)
      {
        return console.error(err)
      }
      else
      {
        res.render("../views/books/details",
        {title: "Add book",
        books: books})
      }
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = book({
      "Title": req.body.title,
      "Author": req.body.author,
      "Genre": req.body.genre,
      "Price": req.body.price
    });

    // Add newBook to db
    book.create(newBook, (err, book) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.redirect("/books");
      }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    // Find book from bd by using id
    book.findById(id, (err, bookToEdit) => {
      if (err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.render("../views/books/details", {
          title: "Edit book",
          books: bookToEdit
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    let editedBook = book({
      "_id": id,
      "Title": req.body.title,
      "Author": req.body.author,
      "Genre": req.body.genre,
      "Price": req.body.price
    });

    // Update a book in db selected by id to editedBook
    book.updateOne({_id: id}, editedBook, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.redirect("/books")
      }
    })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    // Remove a book from db by using id
    book.remove({_id: id}, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.redirect("/books")
      }
    })
});


module.exports = router;
