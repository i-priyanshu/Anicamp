var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");

var userschema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false}
});

userschema.plugin(passportlocalmongoose);

module.exports = mongoose.model("user" , userschema); 