const express = require("express");
const Router = express.Router();

const Users = Router;


Users.get("/",(req,res,next)=>{
res.send("Users route");
next();
});


module.exports = Users;