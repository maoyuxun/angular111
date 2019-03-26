var mongoose = require("mongoose");

var shuoshuoSchema = new mongoose.Schema({
    "email":String,
    "content":String,
    "data":Date
})

var Shuoshuo = mongoose.model("Shuoshuo",shuoshuoSchema);



module.exports = Shuoshuo;