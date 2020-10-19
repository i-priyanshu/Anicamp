var express        = require("express");
var app            = express();
var bodyparser     = require("body-parser");
var mongoose       = require("mongoose");
var passport       = require("passport");
var localstratergy = require("passport-local");
var flash          = require("connect-flash"); 
var methodoverride = require("method-override");
var landscape      = require("./models/landscape");
var seedDB         = require("./seeds");
var user           = require("./models/user");
var comment        = require("./models/comment");

var commnentroutes  = require("./routes/comments");
var landscaperoutes = require("./routes/landscape");
var indexroutes     = require("./routes/index");
 

mongoose.connect("mongodb+srv://admin-priyanshu:pboy9910@cluster0.lmf6k.mongodb.net/ANICAMP",{ useNewUrlParser:true , useUnifiedTopology : true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs"); 
app.use(express.static(__dirname + "/public")); 
app.use(methodoverride("_method"));
app.use(flash());

// seedDB();

app.use(require("express-session")({
    secret: "once again!!",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstratergy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentuser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(indexroutes);
app.use(commnentroutes);
app.use(landscaperoutes);

 
app.listen(process.env.PORT || '3000',function(){
   console.log("Server Has started!!"); 
});