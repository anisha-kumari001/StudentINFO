const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js")
;

const Student = require("../models/student.js");


//Index Route
router.get("/", wrapAsync(async (req, res) => {
  const allstudents = await Student.find({});
  res.render("students-details/index.ejs", { allstudents });
}));

//New Route
router.get("/new", (req, res) => {
  res.render("students-details/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const student = await Student.findById(id);
  res.render("students-details/show.ejs", { student });
}));

// Create Route
router.post("/",
 wrapAsync(async (req, res) => {
  const newstudent = new Student(req.body.student);
  if(!req.body.student){
    throw new ExpressError(400,"Send valid data for student");
  }
  await newstudent.save();
  res.redirect("/students-details");
}));

//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const student = await Student.findById(id);
  res.render("students-details/edit.ejs", { student });
}));

//Update Route
router.put("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Student.findByIdAndUpdate(id, { ...req.body.student });
  if(!req.body.student){
    throw new ExpressError(400,"Send valid data for student");
  }

  res.redirect(`/students-details/${id}`);
}));


 
module.exports = router;
