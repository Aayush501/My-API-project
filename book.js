const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URL).then(() => console.log("connection established."));

const BookSchema = mongoose.Schema(
    {
        ISBN : String,
        title : String,
        publicationDate : String,
        language : String,
        numberOfPages : Number,
        author : [Number],
        publications : [Number],
        category : [String]
    }
);

const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;