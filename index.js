const express = require("express");
const bodyParser = require("body-parser");

//it is a book management project
//database
const database = require("./database");



// initializing express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

/**
 Route 
 description        get all the books 
 access             public 
 parameter          none
 methods            get 
*/

booky.get("/", (req,res) => {
    return res.json({books: database.books});
});


/**
 Route              /is
 description        get specific books 
 access             public 
 parameter          isbn
 methods            get 
*/


booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length == 0){
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

booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );
    if(getSpecificBook.length == 0){
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

booky.get("/lang/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );
    if(getSpecificBook.length == 0){
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

booky.get("/authors", (req,res) => {
    return res.json({authors : database.author});
});


/**
 Route              /authors
 description        get specific authors by id
 access             public 
 parameter          id
 methods            get 
*/

// booky.get("/authors/:id", (req,res) => {
//     const getSpecificAuthor = database.author.filter (
//         (author) => author.id == req.params.id
//     )
//     if(getSpecificAuthor.length === 0){
//         return res.json({error : `rehne do id ${req.params.id} nahi mila`});
//     }
//     return res.json({author: getSpecificAuthor});
// });



/**
 Route              /authors/book 
 description        get specific authors by books
 access             public 
 parameter          book/isbn
 methods            get 
*/


booky.get("/authors/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0){
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


booky.get("/publication", (req,res) => {
    return res.json({publications: database.publication});
});





/**
 Route              /publication/id
 description        get all publications by specific id
 access             public 
 parameter          /id
 methods            get 
*/


booky.get("/publication/:id", (req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.id == req.params.id
    );
    if(getSpecificPublication.length == 0){
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

booky.get("/publication/books/:isbn", (req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length == 0){
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


booky.post("/book/new", (req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBook : database.books});
});


/**
 Route              /author/new
 description        add new authors
 access             public 
 parameter          none
 methods            post
*/


booky.post("/authors/new", (req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json(database.author);
});

/**
 Route              /publication/new
 description        add new publications
 access             public 
 parameter          none
 methods            post
*/

booky.post("/publication/new", (req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json(database.publication);
});


/**
 Route              /publication/update/books
 description        update or add new publication
 access             public 
 parameter          isbn
 methods            put
*/


booky.put("/publication/update/books/:isbn", (req,res) => {
    // update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });

    // update the books database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books,
        publication: database.publication,
        message: "successfully updated publications"
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

booky.delete("/book/delete/:isbn", (req,res) => {
    // whichever book that does not match with the isbn just send that to an updated array
    // and rest will be filtered out
    const updatedBooks = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBooks;

    return res.json({books : database.books});
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