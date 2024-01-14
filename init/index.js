const mongoose = require("mongoose");
const initData = require("./data.js");
const INFO = require("../models/student.js");
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

const initDB = async () => {
  await  INFO.deleteMany({});
  await  INFO.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
