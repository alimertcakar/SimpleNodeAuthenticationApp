const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: String,
    password: String
},{collection:"Credentials"});

UserSchema.pre("save", function (next){
    let user = this;
    console.log(user);
    bcrypt.hash(user.password, 8,(err, hash)=>{
        if(err){
        return next(err);
        }
        else{
        user.password = hash;
        next();
        }
    })    
})

module.exports.UserModel = mongoose.model("User",UserSchema);