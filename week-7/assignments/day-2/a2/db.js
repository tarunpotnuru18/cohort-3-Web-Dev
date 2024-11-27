const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const todoSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, unique: true },
  todos: [
    {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
  ],
});

const usermodel = mongoose.model("users", userSchema);
const todomodel = mongoose.model("todos", todoSchema);

module.exports = { usermodel, todomodel };
