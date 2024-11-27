//creating an auth middleware

const jwt = require("jsonwebtoken");
const JWT_SECRET = "tarun";
const express = require("express");
const router = express();
router.use(express.json());
let users = [];

function auth(req, res, next) {
    console.log("auth middleware")
  const token = req.headers.token;

  if (!token) {
    res.send("un authorized");
  }
  const founduser = jwt.verify(token, JWT_SECRET);
  if (founduser) {
    req.username = founduser.username;
    next();
  } else {
    res.send("un authorized");
  }
}

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password,
  });
  res.send("successfully signed up");
});

router.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let founduser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      founduser = users[i];
    }
  }
  if (founduser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    res.send(token);
  } else {
    res.send("wrong credentials");
  }
});

router.get("/me", auth, (req, res) => {
  let username = req.username;
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
  }
});
router.listen(3000);
