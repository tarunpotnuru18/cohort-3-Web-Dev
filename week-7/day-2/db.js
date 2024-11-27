const mongoose = require("mongoose"); // importing the mongoose library

const userSchema = new mongoose.Schema({
  //creating the userschema
  email: String,
  password: String,
  username: String,
});

const usermodel = mongoose.model("users", userSchema); //creating the usermodel

const todoSchema = new mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  task: String,
});

const todomodel = mongoose.model("todos", todoSchema);

module.exports = { usermodel, todomodel };
