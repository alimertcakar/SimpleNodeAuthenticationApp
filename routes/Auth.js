const express = require("express");
const Router = express.Router();
const path = require("path");
const bodyparser = require("body-parser");
const bcyrpt = require("bcrypt");
const Auth = Router;


const UserModel = require("../schemas/UserSchema").UserModel;



Auth.get("/", (req,res)=>{
  res.sendFile(path.resolve("Nodejs playground 1","../resources/Auth.html"));
  })

  .get("/login", (req,res)=>{
    res.sendFile(path.resolve("./resources/Login.html"));
    })

  .get("/register", (req,res)=>{
    res.sendFile(path.resolve("./resources/Register.html"));
    })
  
  .post("/login",(req,res)=>{
    
    var userData = {
      username: req.body.username,
      password: req.body.password
    }

    UserModel.findOne({username:userData.username}).then(user =>{
        if(user){
            
          bcyrpt.compare(userData.password,user.password,(err,result)=>{
            if(result===true){
              res.send("Succesfully logged in")
            }
            else{
              res.send("Username or password is not correct")
            }
          });

        //TODO Send session
        }
        else{
        res.send("Username does not exist")
        }
     });


    })

  .post("/register",(req,res)=>{

    var userData = {
      username: req.body.username,
      password: req.body.password
    }

    UserModel.findOne({username:userData.username}).then(user => {
      if(!user){   
          if(req.body.password){ 

            UserModel.create({username:req.body.username,password:req.body.password})
            res.redirect("/auth/login") //? So you can login with your newly created account
          }
          else{
            res.send("Could not register, you must specify a password");
          }
      }
      else{
        res.send("Could not register, username exists")
      }
    })
});


module.exports = Auth;