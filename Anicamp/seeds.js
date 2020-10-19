var mongoose = require("mongoose");
var landscape = require("./models/landscape");
var comment = require("./models/comment")


// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Canyon Floor", 
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     }
// ]

function seedDB(){
   //Remove all campgrounds
   landscape.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed landscapes!");
    //     data.forEach(function(seed){
    //         landscape.create(seed,function(err,landscape){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log("added a landscape");
    //                 //create a comment
    //                 comment.create(
    //                     {
    //                         text:"i bet you wanna go there!",
    //                         author:"Anonyumous"
    //                     },function(err,comment){
    //                         if(err){
    //                             console.log(err);
    //                         }else{
    //                             landscape.comments.push(comment);
    //                             landscape.save();
    //                             console.log("created new comments");
    //                         }
                            
    //                     });
    //                 }
    //         });
    //     });
    
    }); 
    //add a few comments
}

module.exports = seedDB;