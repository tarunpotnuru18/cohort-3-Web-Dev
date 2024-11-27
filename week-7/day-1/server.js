//importing the express and doing all the required steps to setup a server
const express = require("express");
const app = express();
app.use(express.json());
//auth middleware
function auth(req, res, next) {
  const token = req.headers.token;
  try {
    const userid = jwt.verify(token, jwt_secret).userid;

    req.headers.userid = userid;
    next();
  } catch (error) {
    res.send("error while authenticating");
  }
}

//importing the json web token library to use it for authentication
const jwt = require("jsonwebtoken");
const jwt_secret = "omnamahshivaya";
//importing the mongoose library
const mongoose = require("mongoose");
mongoose
  .connect(
    ".mongodb.net/todo-database"
  )
  .then(() => {
    console.log("successfully connected");
  });
const { usermodel, todomodel } = require("./db");

app.post("/signup", async (req, res) => {
  const email = req.headers.email;
  const password = req.headers.password;
  const username = req.headers.username;

  try {
    await usermodel.create({
      email,
      password,
      username,
    });
    res.send("signedup successfully");
  } catch (error) {
    res.send("there is an error ehile signing you up, please try again later");
  }
});
app.post("/signin", async (req, res) => {
  const email = req.headers.email;
  const password = req.headers.password;

  try {
    const user = await usermodel.findOne({
      email,
      password,
    });
    console.log(user);
    if (user) {
      const userid = user._id;

      const token = jwt.sign(
        {
          userid: userid.toString(),
        },
        jwt_secret
      );
      res.json(token);
    } else {
      res.send("user doesnt exist");
    }
  } catch (error) {
    res.send("there is an aerror while signing you in,pleae try again later");
  }
});

app.post("/todo", auth, async (req, res) => {
  const userid = req.headers.userid;
  const task = req.body.task;

  try {
    await todomodel.create({
      userid,
      task,
    });
    res.send("todo added successfully");
  } catch (error) {
    res.send("operation failed");
  }
});
app.get("/todos", auth, async (req, res) => {
  const userid = req.headers.userid;

  try {
    const todos = await todomodel.find({
      userid,
    });
    res.json(todos);
  } catch (error) {
    res.send("failed while acessing user todos");
  }
});
app.listen(3000, () => {
  console.log("server started at 3000");
});
