const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError= require("./utils/ExpressError.js")
;

const students = require("./routes/details.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/studentinfo";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req, res) => {
  res.render("students-details/home.ejs");
});


 app.use("/students-details",students);

 app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
  let{status=500,message="something went wrong"}=err;
  res.status(status).render("students-details/error.ejs",{message});
  //res.status(status).send(message);
  
});




app.listen(8080, () => {
  console.log("server is listening to port 8080");
});