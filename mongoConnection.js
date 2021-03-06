const mongoose = require("mongoose");

const mongoURI = "censored";
const connectionOptions ={
   useNewUrlParser:true,
   useUnifiedTopology:true
}

mongoose.connect(mongoURI, connectionOptions);

const db = mongoose.connection;

db.once("open",()=>{console.log("Connected to database")})
db.on("error", (err)=>{console.log("Error while connecting to db:" + err)})

//? If node process ends, end the db connection as well
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});


module.exports.connection = db;