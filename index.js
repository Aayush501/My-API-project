require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//it is a book management project
//database
const database = require("./database");

// models
const BookModel = require("./book");
const AuthorModel = require("./author");
const PublicationModel = require("./publication");


// initializing express 
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log("connection established."));



/**
 Route 
 description        get all the books 
 access             public 
 parameter          none
 methods            get 
*/

booky.get("/", async(req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
    // return res.json({books: database.books});
});


/**
 Route              /is
 description        get specific books 
 access             public 
 parameter          isbn
 methods            get 
*/


booky.get("/is/:isbn", async(req,res) => {
    // const getSpecificBook = database.books.filter(
    //     (book) => book.ISBN === req.params.isbn
    // );

    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

    // !0=1 and !1=0
    if(!getSpecificBook){
        return res.json({error : `No Book Found for ISBN of ${req.params.isbn}`});
    }

    return res.json({book : getSpecificBook});
});


/**
 Route              /c/category
 description        get specific books on category
 access             public 
 parameter          category
 methods            get 
*/

booky.get("/c/:category", async(req,res) => {
    // const getSpecificBook = database.books.filter(
    //     (book) => book.category.includes(req.params.category)
    // );
    const getSpecificBook = await BookModel.findOne({category: req.params.category});
    if(!getSpecificBook){
        return res.json({error : "not found any book with this category"});
    }
    return res.json({book : getSpecificBook});
});


/**
 Route              /lang
 description        get specific books on languages
 access             public 
 parameter          language
 methods            get 
*/

booky.get("/lang/:language", async(req,res) => {
    // const getSpecificBook = database.books.filter(
    //     (book) => book.language.includes(req.params.language)
    // );
    const getSpecificBook = await BookModel.findOne({language: req.params.language});
    if(!getSpecificBook){
        return res.json({error : "not found any book with this language"});
    }
    return res.json({book : getSpecificBook});
})
 

/**
 Route              /authors
 description        get all authors
 access             public 
 parameter          none
 methods            get 
*/

booky.get("/authors", async(req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});


/**
 Route              /authors
 description        get specific authors by id
 access             public 
 parameter          id
 methods            get 
*/

booky.get("/authors/id/:id", async(req,res) => {
    // const getSpecificAuthor = database.author.filter (
    //     (author) => author.id == req.params.id
    // )
    const getSpecificAuthor = await AuthorModel.findOne({Author: req.params.id});
    if(!getSpecificAuthor){
        return res.json({error : `rehne do id ${req.params.id} nahi mila`});
    }
    return res.json({author: getSpecificAuthor});
});



/**
 Route              /authors/book 
 description        get specific authors by books
 access             public 
 parameter          book/isbn
 methods            get 
*/


booky.get("/authors/book/:isbn", async(req,res) => {
    // const getSpecificAuthor = database.author.filter(
    //     (author) => author.books.includes(req.params.isbn)
    // );
    const getSpecificAuthor = await AuthorModel.findOne({Author: req.params.isbn});
    if(!getSpecificAuthor){
        return res.json({error: `jane do ${req.params.isbn} isne nahi likhi`});
    }
    return res.json({author: getSpecificAuthor});
});


/**
 Route              /publication
 description        get all publications
 access             public 
 parameter          none
 methods            get 
*/


booky.get("/publication", async(req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});





/**
 Route              /publication/id
 description        get all publications by specific id
 access             public 
 parameter          /id
 methods            get 
*/


booky.get("/publication/:id", async(req,res) => {
    // const getSpecificPublication = database.publication.filter(
    //     (publication) => publication.id == req.params.id
    // );
    const getSpecificPublication = await PublicationModel.findOne({Publication: req.params.id});
    if(!getSpecificPublication){
        return res.json({error : `jane do id ${req.params.id} nahi mila`});
    }
    return res.json({publications: getSpecificPublication});
});


/**
 Route              /publication/books/isbn
 description        get all publications by published books
 access             public 
 parameter          /books/isbn
 methods            get 
*/

booky.get("/publication/books/:isbn", async(req,res) => {
    // const getSpecificPublication = database.publication.filter(
    //     (publication) => publication.books.includes(req.params.isbn)
    // );
    const getSpecificPublication = await PublicationModel.findOne({Publication: req.params.isbn});

    if(!getSpecificPublication){
        return res.json({error: `mai nahi dhund raha is ISBN ${req.params.isbn} wale book ko`});
    }
    return res.json({publication : getSpecificPublication});
});


// POST 

/**
 Route              /book/new
 description        add new books
 access             public 
 parameter          none
 methods            post
*/


booky.post("/book/new",  async(req,res) => {
    const {newBook} = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books : addNewBook,
        message : "Book Was Added !!!"
    });
    // database.books.push(newBook);
    // return res.json({updatedBook : database.books});
});


/**
 Route              /author/new
 description        add new authors
 access             public 
 parameter          none
 methods            post
*/


booky.post("/authors/new", async(req,res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);

    // database.author.push(newAuthor);
    // return res.json(database.author);

    return res.json({
        authors: addNewAuthor,
        message: "ho gaya"
    });
});

/**
 Route              /publication/new
 description        add new publications
 access             public 
 parameter          none
 methods            post
*/

booky.post("/publication/new", async(req,res) => {
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);

    // database.publication.push(newPublication);
    // return res.json(database.publication);

    return res.json({
       publication: addNewPublication,
       message: "ho gaya" 
    });
});


// ***************** PUT *******************

/**
 Route              /publication/update/books
 description        update book on isbn
 access             public 
 parameter          isbn
 methods            put
*/

booky.put("/book/update/:isbn", async(req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn 
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );

    return res.json({
        books: updatedBook
    });
    
});





/**
 Route              /publication/update/books
 description        update or add new author
 access             public 
 parameter          isbn
 methods            put
*/

booky.put("/book/author/update/:isbn", async(req,res) => {
    // update book database
    const updatedBook = await BookModel.findOneAndUpdate(
       {
            ISBN: req.params.isbn
       },
       {
            $addToSet : {
                author: req.body.newAuthor
            }
       }, 
       {
            new: true
       }
    );
    // update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books : req.params.isbn
            }
        },
        {
            new : true
        }
    );
    return res.json({
        books: updatedBook,
        authors : updatedAuthor,
        "message": "new author was added"
    });
});








/**
 Route              /publication/update/books
 description        update or add new publication
 access             public 
 parameter          isbn
 methods            put
*/


booky.put("/publication/update/books/:isbn", async(req,res) => {
    // update the publication database
    // database.publication.forEach((pub) => {
    //     if(pub.id === req.body.pubId){
    //         return pub.books.push(req.params.isbn);
    //     }
    // });

    // // update the books database
    // database.books.forEach((book) => {
    //     if(book.ISBN === req.params.isbn){
    //         book.publications = req.body.pubId;
    //         return;
    //     }
    // });

    // return res.json({
    //     books: database.books,
    //     publication: database.publication,
    //     message: "successfully updated publications"
    // });

    const updatedPublicationDatabase = await PublicationModel.findOneAndUpdate(
        {
            id: req.body.newPublication
        },
        {
            $addToSet : {
                books: req.params.isbn 
            }
        },
        {
            new: true
        }
    );
    const updatedBookDatabase = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                publications: req.body.newPublication
            }
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatedBookDatabase,
        publications: updatedPublicationDatabase
    });
});


// delete //  

/**
 Route              /book/delete
 description        delete a book
 access             public 
 parameter          isbn
 methods            delete
*/

booky.delete("/book/delete/:isbn", async(req,res) => {
    // whichever book that does not match with the isbn just send that to an updated array
    // and rest will be filtered out
    // const updatedBooks = database.books.filter(
    //     (book) => book.ISBN !== req.params.isbn
    // )
    // database.books = updatedBooks;

    // return res.json({books : database.books});

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );

    return res.json({
        books: updatedBookDatabase
    });

});


/**
 Route              /book/delete/author
 description        delete an author from the book and vice versa
 access             public 
 parameter          isbn,authorId
 methods            delete
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
// update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (author) => author !== parseInt(req.params.authorId)
            )
            book.author = newAuthorList;
            return;
        }
    });

// update the author database
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBookArray = author.books.filter(
                (book) => book !== req.params.isbn
            )
            author.books = newBookArray;
            return;
        }
    });


    return res.json({
        books : database.books,
        authors : database.author,
        message : "successfully done"
    });
});


booky.listen(3000,() => {
    console.log("server is up and running");
});