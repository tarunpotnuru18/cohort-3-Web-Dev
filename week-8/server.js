//dotenv
require("dotenv").config();
const { db_url: mongo,port} = require("./config");

//server-setup
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json()); //middleware

const userRouter = require("./routes/users");
const courseRouter = require("./routes/course");
const adminrouter = require("./routes/admin");
app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/admin", adminrouter);


//database
mongoose.connect(mongo).then(() => {
  console.log("successfully connected to the database");
});
/* const { usermodel, adminmodel, coursemodel, purchasemodel } = require("./db");

//validation
const { z } = require("zod");

//hashing
const bcrypt = require("bcrypt");

//authentication
const jwt = require("jsonwebtoken");
const jwt_secret = "harekrishna"; */
// user routes

app.listen(port,()=>{
  console.log("server started at "+port)
});
