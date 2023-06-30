const mongoose = require("mongoose");
const {User} = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/mongoosedb");

async function run(){
    try{
        // const user = await User.create({
        //     name:"Muhammad Harris", 
        //     age:24,
        //     email: "Harris@gmail.com",
        //     hobbies: ["Weight Lifting", "Bowling"],
        //     address: {
        //         street: "Main Street",
        //         city: "Wah Cantt"
        //     },
        //     bestFriend: "6425289a960cf9fcef06d160",
        // });


        // const user = await User.find({name:"Muhammad Harris"});
        // const user = await User.where("name").eq("Muhammad Harris").where("age").eq(24).limit(1).select("name").select("age");
        // console.log(user);


        // Populate(): It gives all bestfriend data in the _id.
        // const user = await User.find({_id:"642530490e0b4987dfd3f0bd"}).populate("bestFriend");
        // const user = await User.find().populate("bestFriend");
        // console.log(user);


        // lookup(): It gives us a document(all information) of a bestfriend(refrence).
        // const user  = await User.aggregate([{
        //     $lookup:{
        //         from: "users",
        //         localField: "bestFriend",
        //         foreignField:"_id",
        //         as: "bestFriendInfo"
        //     }
        // }]);
        // console.log(user);


        // const user = await User.findOne({name:"Muhammad Harris"});
        // user.sayHi();


        // Custom Method
        // const user = await User.findByName("Muhammad Harris");
        // console.log(user);


        // Query Method
        // const user = await User.findOne().findName("Muhammad Harris"); 
        // console.log(user);


        // For Virtual Property
        // const user = await User.findOne({name: "Muhammad Harris"}); 
        // console.log(user);
        // console.log(user.namedEmail);


        // For Middlewares
        // ==> It changes updatedAt time before saving due to pre("save") middleware. 
        // ==> It run sayHi() function after saving document.
        // const user = await User.findOne({name:"Muhammad Harris", bestFriend:{$exists:true}});
        // await user.save();
        // console.log(user);


    }
    catch(err)
    {
        console.log(err.message);
    }
    

    // const user = new User({name:"Muhammad Harris", age:24});
    // await user.save();
    // console.log(user);
}

run();