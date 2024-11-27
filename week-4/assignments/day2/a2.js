// combining assignment 2 and 3
//having seperate todos for seperate users
//json structure
/* {
    "userid": "user1",
    "todo": [
      { "task": "go to gym", "id": 1 },
      { "task": "go to office", "id": 2 }
    ]
  } */

const fs = require("fs");
const express = require("express");
const app = express(); 
let count = 3; // to generate the todo id
//copying userdata from the todo.json; its buggy it have to fetch every single time that swhy wwe removed the let userData = JSON.parse(fs.readFileSync("./todo.json", "utf-8"));
let userData = JSON.parse(fs.readFileSync("./todo.json", "utf-8"));

function userCheck(req, res, next) {
  const userid =  req.params.user;
  console.log(userid); 
  // let userData = JSON.parse(fs.readFileSync("./todo.json", "utf-8"));
  if (userData.length === 0) {
    res.send("there are no users currently be the first one to become");
    return;
  }
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].userid === userid) {
      next();
      return; //its agood practice to use
    }
  }
  res.send("no such user exists");
  return;
}
//helper functions

function userTodo(userid) {
  // function to get the partcular user object
  // we dont need to check the condtion for the json file to be empty we already checking that in middle ware

  let pos = 0;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].userid == userid) {
      pos = i;
      break;
    }
  }

  return userData[pos]; 
}

function update(user) {
  fs.writeFileSync("todo.json", JSON.stringify(user, null, 2), "utf-8");
  
}

function getTaskId(todo, id) {
  if (todo.length != 0) {
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].id == id) {
        return i;
      }
    }
    return -1;
  } else {
    return -1;
  }
}

//middleware
app.use(express.json());
app.use(userCheck);


//route handler to get the todos of a particular user
app.get("/read/:user/",  function (req, res) {
  const userid = req.params.user;
  console.log(userid);
  let todo = userTodo(userid).todo;
  res.json(todo);
});

// route handler to see overall json data
app.get("/read", function (req, res) {
  let userData = JSON.parse(fs.readFileSync("./todo.json", "utf-8"));
  if (userData.length == 0) {
    res.send("nothing to show ");
  } else {
    res.json(userData);
  }
});

//route handler to add the todos list from a particular user
app.post("/add/:user", userCheck, function (req, res) {
  let todo = userTodo(req.params.user).todo;
  console.log(todo);
  todo.push({
    task: req.body.title,
    id: count,
  });
  count++;
  update(userData);
  res.send("added sucessfully");
});
// route handler to delete the todo
app.post("/delete/:user/", userCheck, function (req, res) {
  let todo = userTodo(req.params.user).todo;
  console.log(todo);
  let pos = getTaskId(todo, req.query.id);
  if (pos != -1) {
    todo.splice(pos, 1);
    update(userData);
    res.send("deleted sucessfully");
  } else {
    res.send("delete failed");
  }
});

app.listen(3000);
