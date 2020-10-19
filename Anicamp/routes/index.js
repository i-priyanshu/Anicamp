var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});

router.get("/register" , function(req,res){
    res.render("register");
})


router.post("/register",function(req,res){
    var newuser = new user({username: req.body.username});
    user.register(newuser , req.body.password , function(err,user){
    if(err){
        res.render("register" , {"error" : err.message});
    }
    passport.authenticate("local")(req,res,function(){
        req.flash("success" , "Succesfully Signed Up! Nice to meet you " + req.body.username);
        res.redirect("/campgrounds");
    });
  });
});

router.get("/login",function(req, res){
    res.render("login");
});

router.post("/login" , passport.authenticate("local" , 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash   :  true,
        successFlash   : 'welcome to Anicamp!'
    }),function(req,res){
});

router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
}); 

module.exports = router; 