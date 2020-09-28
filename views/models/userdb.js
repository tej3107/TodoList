const passport = require("passport");

var passportlmongo  = require("passport-local-mongoose"),
    mongoose        = require("mongoose");

var UserSchema = mongoose.Schema({
    username:String,
    password:String
});

UserSchema.plugin(passportlmongo);

module.exports = mongoose.model("user",UserSchema);