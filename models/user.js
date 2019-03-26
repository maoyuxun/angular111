var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    "email":String,
    "nickname":String,
    "signature":String,
    "password":String,
    "avatar":String

})

var User = mongoose.model("User",userSchema);



module.exports = User;