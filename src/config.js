const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/sb");

connect
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(() => {
    console.log("database cannot be connected");
  });
