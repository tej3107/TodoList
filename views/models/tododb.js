var mongoose = require("mongoose"),
    User     = require("./userdb.js");

var todoSchema = new mongoose.Schema({
    content:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User
        },
        username:String
    }
});

var Todo = mongoose.model("todo",todoSchema);

module.exports = Todo;