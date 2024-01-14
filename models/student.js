const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
  name: {
    type: String,
   
  },
  rollid: {
    type: String,
    
  },
  image: {
    type: String,
    default:
      "https://avatar.iran.liara.run/public/boy?username=Ash",
    set: (v) =>
      v === ""
        ? "https://avatar.iran.liara.run/public/boy?username=Ash"
        : v,
  },
cg: {
    type: Number,
   
  },sem: {
    type: Number,
    
  },courses:
    {
      IWT:{
        type: Number,
        required: true,},
        OS:{
          type: Number,
          required: true,},
        DBMS:{
            type: Number,
            required: true,},
            ML:{
              type: Number,
              required: true,}
              
        
      
    }
  
  

});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
