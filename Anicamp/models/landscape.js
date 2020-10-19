var mongoose = require("mongoose");

var landscapeschema = new mongoose.Schema({
    name : String,
    price: String,
    image: String,
    description : String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username: String
    },
    comments : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : "comment"
        }
    ]
    
});

module.exports = mongoose.model("landscape", landscapeschema);
