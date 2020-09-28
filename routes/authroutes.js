var express         = require("express"),
    app             = express.Router({mergeParams:true}),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    passportlocal   = require("passport-local"),
    passportlmongo  = require("passport-local-mongoose"),
	User            = require("../views/models/userdb");
	
	app.use(bodyParser.urlencoded({extended:true}));

//===========================================================

app.get("/signup",function(req,res){
    res.render("signup",{user:req.isAuthenticated()});
})

app.post("/signup",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        // console.log(user);
        passport.authenticate("local")(req,res,function(){
            res.redirect("/todo");
        })
    })
})

app.get("/login",function(req,res){
    res.render("login",{message:req.flash("error"),suc:req.flash("success"),user:req.isAuthenticated()});
})

app.post("/login",passport.authenticate("local",{
	successRedirect:"/todo",
    failureRedirect:"/login",
}),function(req,res){
    // req.flash("loginerr","Please input valid login id");
})

app.get("/logout",isloggedin,function(req,res){
    req.logOut();
    req.flash("success","Succesfully Logged Out");
    res.redirect("/login");
})

function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect("/login");
    }
}


module.exports = app;
