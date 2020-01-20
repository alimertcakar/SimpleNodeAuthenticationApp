const express = require("express");
const app = express();
const cookie = require("cookie-parser");



const Users = require("./routes/Users");
const Auth = require("./routes/Auth");
const db = require("./mongoConnection").connection;


app.use(express.static("./resources"));
app.use(express.static("./public"));


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookie("shhh, this is a secret"));
app.use("/users",Users);
app.use("/auth", Auth);

app.use((req,res)=>{res.status(404); res.send("404")})

app.listen(80,()=>{console.log("server succesfully started")})