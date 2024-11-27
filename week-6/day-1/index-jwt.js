const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "omnamahshivaya";
const app = express();
app.use(express.json());
let users = [];
app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password,
  });
  res.send("welcome to the club");
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let founduser = null;
  let token = "";
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      founduser = users[i];
    }
  }

  if (founduser) {
    token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    res.send({
      token: token,
    });
  } else {
    res.send(
      "yo yo keep an eye while you type, the provided credentials are wronh"
    );
  }

});

app.get("/me", function (req, res) {
  let token = req.headers.token;
  console.log(token)
  const decodedtoken = jwt.verify(token, JWT_SECRET);
  const user = decodedtoken.username;
  let founduser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === user) {
      founduser = users[i].password;
    }
    if (founduser) {
      res.json({
        username: user,
        password: founduser,
      });
    }else{
        res.send("wrong token")
    }
  }
});
 

app.listen(3000)