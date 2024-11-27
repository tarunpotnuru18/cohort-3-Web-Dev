const express = require("express");
const app = express();
const users = [];
app.use(express.json());
function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  let token = "";
  for (let i = 0; i < 16; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });
  res.end("welcome to the club 🍻");
});
app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let userfound = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      userfound = users[i];
    }
  }

  if (userfound) {
    let token = generateToken();
    userfound.token = token;
    res.json(token);
  } else {
    res
      .status(403)
      .send("the provided credentials are wrong please have a look");
  }
});

app.get("/me", function (req, res) {
  const token = req.headers.token;
  console.log(token);
  let userfound = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].token === token) {
      userfound = users[i];
    }
  }
  if (userfound) {
    res.json({
      username: userfound.username,
      password: userfound.password,
    });
  } else {
    res.send("user not found please check credentials");
  }
});
app.listen(3000);
