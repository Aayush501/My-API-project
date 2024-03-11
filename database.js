const books = [
    {
        ISBN : "12345",
        title : "Tesla",
        publicationDate : "2024-02-28",
        language : "en",
        numberOfPages : 250,
        author : [1,2],
        publications : [1],
        category : ["tech", "space", "education"]
    },
    {
        ISBN : "6789",
        title : "abcd",
        publicationDate : "2024-03-03",
        language : "hindi",
        numberOfPages : 250,
        author : [1,3],
        publications : [2],
        category : ["action", "thriller"]
    }
]


const author = [
    {
        id : 1,
        name : "aayush",
        books : ["12345", "kuchbhi"]
    },
    {
        id : 2,
        name : "Elon Musk",
        books : ["12345","161718","131415"]
    }
]



const publication = [
    {
        id : 1,
        name : "writex",
        books : ["12345","161718"]
    },
    {
        id : 2,
        name : "readx",
        books : ["6789","131415"]
    }
]


module.exports = {books, author, publication};