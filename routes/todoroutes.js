var express       = require("express"),
    app           = express.Router({mergeParams:true}),
    Todo          = require("../views/models/tododb.js");

app.get('/',function(req,res){
    res.render("home",{user:req.isAuthenticated()});
});

app.post("/todos",isloggedin,function(req,res){
    console.log(req.user);
    Todo.create({content:req.body.Todo,author:req.user},function(err,todos){
        res.redirect("/todo");
    })
})

app.delete("/todo/:id",function(req,res){
    Todo.findByIdAndRemove(req.params.id,function(err){
        res.redirect("/todo");
    })
})

app.get("/todo",isloggedin,function(req,res){
    Todo.find({},function(err,todo){
        res.render("todo",{todo:todo,auth:req.user});
    })
})

function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash("error","Please Login First");
        res.redirect("/login");
    }
}

module.exports = app ;