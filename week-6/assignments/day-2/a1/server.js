-6//json web token framework
const jwt = require("jsonwebtoken");
const JWT_secret = "tarun123";

//express server
const express = require("express");
const app = express();

//cors middleware

const cors = require("cors");

//change
const path = require('path')
app.use(express.static(__dirname))

//


//middlewares
app.use(cors());
app.use(express.json());
function auth(req, res, next) {}

//our mini data base

let users = [];

app.post("/signup", function (req, res) {
  try {
    let username = req.body.username;
    let password = req.body.password;

    users.push({
      username: username,
      password: password,
    });
    res.send("user successfully signedup");
  } catch (e) {
    res.send(
      "there is an error while signup please contact to server maintainers"
    );
  }
});

app.post("/signin", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let founduser = null;
  console.log("i am here")
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password === password) {
      founduser = users[i];
    }
  }
  if (founduser) {
    let token = jwt.sign(
      {
        username: username,
      },
      JWT_secret
    );

    res.send(token);
  } else {
    res.send("wrong credentials");
  }
});
app.get("/me", function (req, res) {
  //here we can add an auth middleware refer week-6.2 slides
  const token = req.headers.token;
  console.log(token)
  try {
    const decodedData = jwt.verify(token, JWT_secret);

    const username = decodedData.username;

    let founduser = null;

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        founduser = users[i];
      }
    }
    if (founduser) {
      res.json({
        username: username,
        password: founduser.password,
      });
    } else {
      res.send("no such user found");
    }
  } catch (e) {
    console.error(e);
    res.send("error occured");
  }
});

app.get("/todos",function(req,res){
     res.redirect("/index2.html")

})

app.listen(3000, () => {
  console.log("server started at port 3000");
});
