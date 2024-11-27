const express = require("express");

const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "jaisriram";
const path = require("path");

let users = [
  {
    username: "tarun",
    userid: "tarun",
    password: "tarun",
  },
];
let todo = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//middlewares
function auth(req, res, next) {
  const token = req.headers.token;

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.headers.userid = data.userid;
    next();
  } catch (e) {
    res.status(401).send("authentication failed");
  }
}

app.post("/signup", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let userid = req.body.userid;
  let userexists = users.find((user) => {
    return userid === user.userid;
  });

  if (userexists) {
    res.status(420).send("userid already exists please try another one");
  } else {
    users.push({
      userid: userid,
      username: username,
      password: password,
    });

    res.status(200).send("user successfully signedup");
  }
});

app.post("/signin", function (req, res) {
  let userid = req.body.userid;
  let password = req.body.password;

  let useridexists = users.find((user) => {
    return userid === user.userid && password === user.password;
  });

  if (useridexists) {
    const token = jwt.sign(
      {
        userid: userid,
      },
      JWT_SECRET
    );
    res.status(200).json(token);
  } else {
    res.send("provided credentials are wrong please check");
  }
});

app.get("/todos", auth, function (req, res) {
  const userid = req.headers.userid;
  //here we are tying to get  all the todos of the given todoid
  let result = todo.filter((todo) => {
    return todo.userid === userid;
  });

  res.json(result);
});

app.post("/todos", auth, function (req, res) {
  const userid = req.headers.userid;
  const task = req.body.task;
  const iscompleted = req.body.iscompleted;
  const todoid = req.body.todoid;

  const isediting = req.body.isediting;
  todo.push({
    userid,
    task,
    iscompleted,
    todoid,
    isediting,
  });

  res.send("sucessfully added");
});

app.put("/todos", auth, function (req, res) {
  const userid = req.headers.userid;
  const task = req.body.task;
  const iscompleted = req.body.iscompleted;
  const todoid = req.body.todoid;
  const isediting = req.body.isediting;
  const index = todo.findIndex((todoel) => {
    return todoel.userid == userid && todoel.todoid == todoid;
  });

  todo[index].task = task;
  todo[index].iscompleted = iscompleted;
  todo[index].isediting = isediting;

  res.send("successfully updated");
});
app.delete("/todos/:todoid", auth, function (req, res) {
  const userid = req.headers.userid;

  const todoid = req.params.todoid;

  const index = todo.findIndex((todo) => {
    return todo.userid == userid && todo.todoid == todoid;
  });
  todo.splice(index, 1);
  res.send("successfully deleted");
});

app.listen(3000);
