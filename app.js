var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodd         = require("method-override"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    passportlocal   = require("passport-local"),
    passportlmongo  = require("passport-local-mongoose");
    

// mongoose.connect('mongodb://localhost:27017', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(()=>console.log("Connected to database"))
// .catch((err)=>console.log(err));
// console.log(process.env.DATABASEURL);
mongoose.connect('mongodb+srv://tej:tej@todo.qfotz.mongodb.net/tej?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log(err));

//=================================================

var todoroute       = require("./routes/todoroutes"),
    authroute       = require("./routes/authroutes"),
    User            = require("./views/models/userdb"),
    Todo            = require("./views/models/tododb");

    User.find({},function(err,todo){
        console.log(todo);
    })

//=================================================
    
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(methodd("_method"));
    app.use(express.static(__dirname + '/public'));
    app.set("view engine","ejs");

    app.use(require("express-session")({
        secret:"Todo List",
        resave:false,
        saveUninitialized:false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req,res,next){
        res.locals.currentUser=req.user;
        res.locals.message=req.flash;
        next();
    })
    app.use(flash());
    

//=================================================
    passport.use(new passportlocal(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

//=================================================

app.use(todoroute);
app.use(authroute);

//=================================================

app.listen(8080,function(){
        console.log("Server started");
    });

// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("Server started at "+ process.env.PORT);
// });