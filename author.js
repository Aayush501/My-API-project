const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URL).then(() => console.log("connection done."));

const AuthorSchema = mongoose.Schema(
    {
        id : Number,
        name : String,
        books : [String]
    }
);

const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;