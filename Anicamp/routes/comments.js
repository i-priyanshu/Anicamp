var express = require("express");
var router = express.Router();
var landscape = require("../models/landscape");
var comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/campgrounds/:id/comments/new",middleware.isloggedIn, function(req,res){
    landscape.findById(req.params.id , function(err,landscape){
        if(err || !landscape){
            req.flash("error" , "Post not found");
            res.redirect("back");
        }else{
            res.render("comments/new" , {landscape:landscape}); 
        }
    })
})

router.post("/campgrounds/:id/comments",middleware.isloggedIn,function(req,res){
    landscape.findById(req.params.id , function(err,landscape){
        if(err){
            console.log(err);
        }else{
            comment.create(req.body.comment , function(err,comment){
                    if(err){
                        req.flash("error" , "Something went wrong ");
                        console.log(err);
                    }else{
                        comment.author.id = req.user._id; 
                        comment.author.username = req.user.username;
                        comment.save();
                        landscape.comments.push(comment);
                       landscape.save();
                       req.flash("success" , "Successfully added comments");
                       res.redirect("/campgrounds/" + landscape._id)
                    }
            });
        }
    });    
});

//COMMENT EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkcomments,function(req,res){
    landscape.findById(req.params.id , function(err, foundl){
        if(err || !foundl){
            req.flash("error" , "Landscape not found!");
            return res.redirect("back");
        }
        comment.findById(req.params.comment_id , function(err,found){
            if(err){
                res.redirect("back");
            } else{
                res.render("comments/edit",{landscape_id: req.params.id, comment:found});
            }
        });
    });
});

//COMMENT UPDATE
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkcomments,  function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated){
        if(err){
            res.redirect("back"); 
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkcomments ,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else {
            req.flash("success" , "Comment deleted");
            res.redirect("/campgrounds/"  + req.params.id);
        }
    });
});

module.exports = router;