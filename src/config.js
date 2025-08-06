const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/sb");

connect
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(() => {
    console.log("database cannot be connected");
  });

// Create a schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// Create collection
const collection = mongoose.model("users", LoginSchema);

// Export the model if needed in other files
module.exports = collection;
