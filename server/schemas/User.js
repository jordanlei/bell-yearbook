var mongoose = require('mongoose');
require('dotenv').config();


var uri= process.env.MONGO_DB_CONNECTION
// the host:port must match the location where you are running MongoDB
// the "myDatabase" part can be anything you like
mongoose.connect(uri);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    year: Number,
    email: String,
    bio: String,
    funFact: String,
    avatar: String,

    phone: String, 
    concentrations: String,  

    position1: String,
    place1: String,  
    location1: String, 
    startMonth1: String, 
    startYear1: Number, 
    endMonth1: String, 
    endYear1: Number, 
    description1: String, 

    position2: String, 
    place2: String, 
    location2: String, 
    startMonth2: String, 
    startYear2: Number, 
    endMonth2: String, 
    endYear2: Number, 
    description2: String, 

    position3: String, 
    place3: String, 
    location3: String, 
    startMonth3: String, 
    startYear3: Number, 
    endMonth3: String, 
    endYear3: Number, 
    description3: String, 

    industries: [String], 
    tags: [String],

    isLive: Boolean
    });

// export userSchema as a class called User
module.exports = mongoose.model('User', userSchema);

userSchema.methods.standardizeName = function() {
    this.name = this.name.toLowerCase();
    return this.name;
}