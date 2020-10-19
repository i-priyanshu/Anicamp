var express = require("express");
var router = express.Router();
var landscape = require("../models/landscape");
var middleware = require("../middleware");

router.get("/campgrounds", function(req,res){    
    landscape.find({},function(err, allandscapes){
    if(err){
        console.log(err);
    } else{
        res.render("landscape/index",{campgrounds : allandscapes , currentuser:req.user});
    }      
    });
}); 

//CREATE - add new landscapes
router.post("/campgrounds",middleware.isloggedIn,function(req,res){
   //get data from form and add to campgrounds array
    var name = req.body.name; 
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username 
    }
    var newlandscape = {name: name, image :image , description: desc , author:author }
    
    landscape.create(newlandscape , function(err,newlycreated){
        if(err){
            console.log(err);
        }else{ 
            res.redirect("/campgrounds");
        }
    })
});

//NEW - show form to create new route
router.get("/campgrounds/new" ,middleware.isloggedIn,function(req, res){
    res.render("landscape/new");
});

router.get("/campgrounds/:id",function(req,res){
    //find the landscape with provided ID
    landscape.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err || !found){
               req.flash("error" , "campground not found!");
               return res.redirect("back"); 
        }else{
            // console.log(found);
            res.render("landscape/show",{landscape : found});
        }
    });   
});

//For EDIT CAMPGROUND
router.get("/campgrounds/:id/edit",middleware.checklandscapes,function(req,res){
        landscape.findById(req.params.id,function(err,found){
                    res.render("landscape/edit" , {landscape: found});
            });
});
//UPDATE CAMPGROUND
router.put("/campgrounds/:id" ,middleware.checklandscapes,function(req,res){
    
    landscape.findByIdAndUpdate(req.params.id,req.body.landscape, function(err,updated){
        if(err){
            res.redirect("/campgrounds");
        } else { 
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/campgrounds/:id",middleware.checklandscapes, function(req,res){
   landscape.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/campgrounds"); 
        }
        res.redirect("/campgrounds"); 
   });
});

module.exports = router; 