const express = require("express");
const app = express();
let todo = [];
let count = 1;
app.use(express.json()); // for built in middle ware functions we dont need to pass the required args

app.post("/", function (req, res) {
  let id = count;
  let task = req.body.title;
  if (todo.length != 0) {
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].task == task) {
        res.send("task already existed");
        return;
      }
    }
  }

  todo.push({
    task: task,
    id: id,
  });
  count++;
  res.send("added successfully");
});

app.delete("/delete/:id", function (req, res) {
  //the route should begin with "/" its manadatory
  let target = parseInt(req.params.id); // we have to parse here the param come back as a string
  if (todo.length != 0) {
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].id == target) {
        todo.splice(i, 1);
        res.send("successfully removed");
        return;
      }
    }
    // if no such id is present
    res.send("no such task id is present!");
    return;
  } else {
    res.send("no tasks to delete");
  }
});
app.get("/", function (req, res) {
  if (todo.length != 0) {
    res.json(todo); // in json if any key contains null as value then in the final o/p it is ignored
  } else {
    res.send("nothing to show!");
  }
});
app.listen(3000);
