var landscape = require("../models/landscape");
var comment = require("../models/comment");
var middleware = {};

middleware.checklandscapes = function(req,res,next){
        if(req.isAuthenticated()){
            landscape.findById(req.params.id,function(err,found){
                if(err || !found){
                    req.flash("error" , "Landscape Not Found");
                    res.redirect("back");
                } else {
                    //does the user own the landscape?
                      if(found.author.id.equals(req.user._id)){
                        req.landscape = found;
                       next();
                      } else {
                          req.flash("error" , "You don't have permission to do that");
                           res.redirect("/campgrounds/" + req.params.id);
                      }
                    }
                });
        } else {
            res.redirect("back");
        }
    }

middleware.checkcomments = function(req,res,next){
        if(req.isAuthenticated()){
            comment.findById(req.params.comment_id,function(err,found){
                if(err || !found){
                    req.flash("error" , "comment not found");
                    res.redirect("back");
                } else {
                    //does the user own the comments?
                       if(found.author.id.equals(req.user._id)){
                        req.comment = found;
                        next();
                      } else {
                        req.flash("error" , "You don't have permission to do that!");
                        res.redirect("/campgrounds/" + req.params.id);
                      }
                    }
                });
        } else {
            req.flash("error" , "You need to be logged in do that!!");
            res.redirect("back");
        }
    }

middleware.isAdmin = function(req,res,next){
    if(req.user.isAdmin) {
        next();
    }else {
        req.flash("error" , "Please don't try your skills here!");
        res.redirect("back");
    }
}

middleware.isloggedIn = function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error" , "You need to be logged in do that!!");
        res.redirect("/login");
    }
    
module.exports = middleware;