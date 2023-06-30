const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    street: String,
    city: String
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    age: {
        type: Number,
        min: 1,
        max:100,
        // validate: { // Only run on user.creat() and user.save(). Not findByIdAndUpdate().
        //     validator: v => v%2 == 0,
        //     message: props => `${props.value} is not a number`, // message only run if above false.
        //     validator: v => !isNaN(v),
        //     message: props => `${props.value} is not a number`,
        // }
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=> Date.now() 
    }, 
    updatedAt: {
        type:Date,
        default: ()=> Date.now()
    },
    bestFriend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //This ref tells mongoose what model does have this above object id. 
    },
    hobbies: [],
    address: addressSchema
});


// schema.methods is used to define instance methods on a Mongoose model. Instance methods are called on individual documents.
userSchema.methods.sayHi = function() {
    console.log(`Hi! My name is ${this.name}`);
};


// schema.statics is used to define static methods on a Mongoose model. , while static methods are called on the entire model itself to perform operations on the collection of documents stored in the database.
userSchema.statics.findByName = function(name) {
    return this.where({name: new RegExp(name, "i")});
}


// schema.query(), are essentially creating a function that extends the functionality of Mongoose's built-in query methods (such as find(), findOne(), etc.), and allows you to add custom behavior to the query.
userSchema.query.findName = function(name) {
    return this.where({name: new RegExp(name, "i")});
}


// Virtual property: schema.virtual() for creating a virtual property for every document but it's not stored in databse.
userSchema.virtual("namedEmail").get(function (){
    return `${this.name} <${this.email}>`;
});


// Document Middleware: are functions that are executed before or after certain operations on a document, such as saving or deleting the document.
// Query Middleware: are functions that are executed before or after certain query operations on a model, such as find or update.

// pre(): Before saving a Model. others are "validate", "remove" & "update".
userSchema.pre("save", function(next){
    this.updatedAt = Date.now();
    next();
});

// post(): After saving a Model.
// Can't use "this" here. it going to pass the document "doc" that just saved.
userSchema.post("save", function(doc){
    doc.sayHi();
});



const User = mongoose.model("User", userSchema);

module.exports = {User};