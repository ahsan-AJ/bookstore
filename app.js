const express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

// Connect to mongoose
mongoose.connect('mongodb://aj160:aj160@ds145178.mlab.com:45178/bookstoreapp');
const db = mongoose.connection;

app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));

Genre = require('./models/genre');
Book = require('./models/book');
//Routes



app.get('/',function(req,res){
    res.send('Hello World');
});    // Handle Home page Get request

//Get all genres

/**
 * @api {get} /api/genres Get All Genres
 * @apiGroup Genres
 * @apiSuccess {Number} genres.id Genre ID
 * @apiSuccess {String} genres.name  Genre Name
 * @apiSuccess {Date} genres.createDate Genre Date Created
 * @apiSuccessExample {json} Success Response Example
 *
 *  [
  {
    "_id": "5860d04bebfc35e67b28926f",
    "name": "Suspense",
    "createDate": "2016-12-26T11:15:06.924Z"
  },
  {
    "_id": "5860d06cebfc35e67b289270",
    "name": "Self Help",
    "createDate": "2016-12-26T11:15:06.928Z"
  }
]
*/
app.get('/api/genres',function(req,res){
    Genre.getGenres(function(error,genres){
        if(error) throw error;
        res.json(genres);
    })
});

// Add A Genre
/**
 * @api {post} /api/genres Add A Genre
 * @apiGroup Genres
 * @apiParam {String} name Genre Name
 * @apiParamExample {json} Input Example
 * {
 *  "name":"Book Title"
 * }
 * @apiSuccess {String} id Genre Id
 * @apiSuccess {String} name Genre name
 * @apiSuccess {Date} createDate Genre Date Created
 * @apiSuccessExample {json} Success Response Example
 *  {
 * "_id": "58610b19189c243fb8dbd2f8",
 * "name": "Horror",
 * "createDate": "2016-12-26T12:20:41.965Z"
 *}
 */

app.post('/api/genres',function(req,res){
    var genre = req.body;
    Genre.addGenre(genre,function(error,genre){
        if(error) throw error;
        res.json(genre);
    })
});

// Update a genre
/**
 * @api {put} /api/genres/:_id Update A Genre
 * @apiGroup Genres
 * @apiParam {String} id Genre ID
 * @apiParam {String} name Genre Name
 * @apiParamExample {json} Input Example
 * {
 *  "name":"Book Title"
 * }
 * @apiSuccess {String} id Genre Id
 * @apiSuccess {String} name Genre name
 * @apiSuccess {Date} createDate Genre Date Created
 * @apiSuccessExample {json} Success Response Example
 *  {
 * "_id": "58610b19189c243fb8dbd2f8",
 * "name": "Fiction",
 * "createDate": "2016-12-26T12:20:41.965Z"
 *}
 */



app.put('/api/genres/:_id',function(req,res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id,genre,{},function(error,genre){
        if(error) throw error;
        res.json(genre);
    })
});

// Delete a genre

/**
 * @api {delete} /api/genres/:_id Delete A Genre
 * @apiGroup Genres
 * @apiParam {String} id Genre ID
 * @apiSuccessExample {json} Success Response Example
 * {
 * "n": 1,
 * "ok": 1
 *}
 */


app.delete('/api/genres/:_id',function(req,res){
    var id = req.params._id;

    Genre.removeGenre(id,function(error,genre){
        if(error) throw error;
        res.json(genre);
    })
});


// Get all books

/**
 * @api {get} /api/books Get All Books
 * @apiGroup Books
 * @apiSuccess {String} books.id Book ID
 * @apiSuccess {String} books.title  Book Title
 * @apiSuccess {String} books.genre  Book Genre
 * @apiSuccess {String} books.description  Book's Description
 * @apiSuccess {String} books.author  Book Author
 * @apiSuccess {String} books.publisher  Book Publisher
 * @apiSuccess {String} books.pages  Book Pages
 * @apiSuccess {String} books.image_url  Book Image URL
 * @apiSuccess {String} books.buy_url  Book Buy URL
 * @apiSuccess {Date} genres.createDate Genre Date Created
 * @apiSuccessExample {json} Success Response Example
 *  {
 * [
 * {
 *   "_id": "5860d4504857ab9c4a6f078a",
 *   "title": "The Murder House",
 *   "genre": "Suspense",
 *   "description": "Dummy description of book",
 *   "author": "James Patterson",
 *   "publisher": "Brown and Company",
 *   "pages": "480",
 *   "image_url": "http://prodimage.images-bn.com/pimages/9781455589906_p0_v1_s192x300.jpg",
 *  "buy_url": "http://www.barnesandnoble.com/w/truth-or-die-james-patterson/1120509003?ean=9781455584963",
 *   "createDate": "2016-12-26T12:34:13.683Z"
 * },
 * {
 *   "_id": "5860d4c80db4e2dceef7295f",
 *   "title": "Truth or Die",
 *   "genre": "Suspense",
 *   "description": "Dummy description of book",
 *   "author": "James Patterson",
 *   "publisher": "Brown and Company",
 *   "pages": "480",
 *   "image_url": "http://prodimage.images-bn.com/pimages/9781455589906_p0_v1_s192x300.jpg",
 *   "buy_url": "http://www.barnesandnoble.com/w/truth-or-die-james-patterson/1120509003?ean=9781455584963",
 *   "createDate": "2016-12-26T12:34:13.684Z"
 * }
*]
 */

app.get('/api/books',function(req,res){
    Book.getBooks(function(error,books){
        if(error) throw error;
        res.json(books);
    })
});

// Get a single book

/**
 * @api {get} /api/books/:id Get A Book By Id
 * @apiGroup Books
 * @apiSuccess {String} books.id Book ID
 * @apiSuccess {String} books.title  Book Title
 * @apiSuccess {String} books.genre  Book Genre
 * @apiSuccess {String} books.description  Book's Description
 * @apiSuccess {String} books.author  Book Author
 * @apiSuccess {String} books.publisher  Book Publisher
 * @apiSuccess {String} books.pages  Book Pages
 * @apiSuccess {String} books.image_url  Book Image Link
 * @apiSuccess {String} books.buy_url  Book Buy Link
 * @apiSuccess {Date} genres.createDate Book Date Created
 * @apiSuccessExample {json} Success Response Example
 * {
 *  "_id": "5861134a70e54f1e48f118b1",
  "title": "The Alchemist",
  "genre": "Suspense",
  "description": "The Alchemist description",
  "author": "Paulo Coelho",
  "publisher": "Random",
  "pages": "285",
  "image_url": "http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s192x300.jpg",
  "buy_url": "http://www.barnesandnoble.com/w/the-whistler-john-grisham/1123556270?ean=9780385541190",
  "createDate": "2016-12-26T12:55:38.060Z"
}

 */

app.get('/api/books/:_id',function(req,res){
    Book.getBookById(req.params._id,function(error,book){
        if(error) throw error;
        res.json(book);
    })
});

// Add a book

/**
 * @api {post} /api/books Add A Book
 * @apiGroup Books
 * @apiParam {String} title Book's Title
 * @apiParam {String} genre Book's Genre
 * @apiParam {String} description Book's Description
 * @apiParam {String} author Book's Author
 * @apiParam {String} publisher Book's Publisher
 * @apiParam {String} pages Book Pages
 * @apiParam {String} image_url Book's Image Link
 * @apiParam {String} buy_url Book's Buy Link
 * @apiParamExample {json} Input Example
 * {
	"title":"The Whistler",
	"genre":"Action",
	"description":"We expect our judges to be honest and wise. Their integrity is the bedrock of the entire judicial system. We trust them to ensure fair trials, to protect the rights of all litigants, to punish those who do wrong.",
	"author":"John Grisham",
	"publisher":"Random",
	"pages":"300",
	"image_url":"http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s192x300.jpg",
	"buy_url":"http://www.barnesandnoble.com/w/the-whistler-john-grisham/1123556270?ean=9780385541190"

}
 * @apiSuccess {String} books.id Book ID
 * @apiSuccess {String} books.title  Book Title
 * @apiSuccess {String} books.genre  Book Genre
 * @apiSuccess {String} books.description  Book's Description
 * @apiSuccess {String} books.author  Book Author
 * @apiSuccess {String} books.publisher  Book Publisher
 * @apiSuccess {String} books.pages  Book Pages
 * @apiSuccess {String} books.image_url  Book Image Link
 * @apiSuccess {String} books.buy_url  Book Buy Link
 * @apiSuccess {Date} genres.createDate Book Date Created
 @apiSuccessExample {json} Success Response Example
 * {
 *  "_id": "5861134a70e54f1e48f118b1",
 * "title": "The Alchemist",
 * "genre": "Suspense",
 * "description": "The Alchemist description",
 * "author": "Paulo Coelho",
 * "publisher": "Random",
 * "pages": "285",
 * "image_url": "http://prodimage.images-bn.com/pimages/9780385541190_p0_v4_s192x300.jpg",
 * "buy_url": "http://www.barnesandnoble.com/w/the-whistler-john-grisham/1123556270?ean=9780385541190",
 * "createDate": "2016-12-26T12:55:38.060Z"
 *}
 */


app.post('/api/books',function(req,res){
    var book = req.body;
    Book.addBook(book,function(error,book){
        if(error) throw error;
        res.json(book);
    })
});

// Update a book




app.put('/api/books/:_id',function(req,res){
    var id = req.params._id
    var book = req.body;
    Book.updateBook(id,book,{},function(error,book){
        if(error) throw error;
        res.json(book);
    })
});

// Delete a book

/**
 * @api {delete} /api/genres/:_id Delete A Book
 * @apiGroup Books
 * @apiParam {String} id Book ID
 * @apiSuccessExample {json} Success Response Example
 * {
 * "n": 1,
 * "ok": 1
 *}
 */


app.delete('/api/books/:_id',function(req,res){
    var id = req.params._id;

    Book.removeBook(id,function(error,book){
        if(error) throw error;
        res.json(book);
    })
});


app.listen(port);
console.log('Connected on port 3000');