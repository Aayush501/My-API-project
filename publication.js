const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URL).then(() => console.log("connection done."));

const PublicationSchema = mongoose.Schema(
    {
        id : Number,
        name : String,
        books : [String]
    }
);

const PublicationModel = mongoose.model("Publication", PublicationSchema);

module.exports = PublicationModel;