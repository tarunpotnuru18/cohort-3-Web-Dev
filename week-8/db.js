const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
});
const adminschema = new mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
});
const courseschema = new mongoose.Schema({
  name: String,
  content:String,
  description:String,
  price: Number,
  creator: mongoose.Schema.Types.ObjectId,
});
const purchaseschema = new mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  purchases: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

const usermodel = mongoose.model("users", userschema);
const adminmodel = mongoose.model("admins", adminschema);
const coursemodel = mongoose.model("courses", courseschema);
const purchasemodel = mongoose.model("purchases", purchaseschema);

module.exports = { usermodel, adminmodel, coursemodel, purchasemodel };
