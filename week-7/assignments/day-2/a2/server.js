//for server
const express = require("express");
const app = express();
app.use(express.json());

//for hosting the files static
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//for jwt token
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jaisriram";

// for hashing
const bcrypt = require("bcrypt");

//for database connection
const mongoose = require("mongoose");
const { usermodel, todomodel } = require("./db");
mongoose
  .connect("mongodb.net/todo-app")
  .then(() => {
    console.log("connected");
  });

// for validation
const { z } = require("zod");

//custom middleware

function auth(req, res, next) {
  const token = req.headers.token;
  try {
    const userid = jwt.verify(token, JWT_SECRET).userid;
    req.userid = userid;
    next();
  } catch (error) {
    res.status(401).send("authentication error");
  }
}

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const requiredStructure = z.object({
    email: z.string().min(3).max(100).email(),
    username: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
  });

  const validationResult = requiredStructure.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).json({
      messsage: "provided credentials are not in right format",
      " error": validationResult.error,
    });
    return;
  }

  try {
    const hash = await bcrypt.hash(password, 5);
    const user = await usermodel.create({
      email,
      password: hash,
      username,
    });
    if (user) {
      res.send("signed up successfully");
    }
  } catch (error) {
    res.status(401).send("error while signing you up");
  }
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const requiredStructure = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(30),
  });

  const validationResult = requiredStructure.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).json({
      messsage: "provided credentials are not in right format",
      " error": validationResult.error,
    });
    return;
  }

  try {
    const user = await usermodel.findOne({
      email,
    });

    const bcryptresponse = await bcrypt.compare(password, user.password);

    if (user && bcryptresponse) {
      const token = jwt.sign(
        {
          userid: user._id,
        },
        JWT_SECRET
      );

      res.send(token);
    }
  } catch (error) {
    res.status(401).send("error while signing you in");
  }
});

app.post("/todos", auth, async (req, res) => {
  try {
    const userid = req.userid;
    const todos = req.body.todos;

    const response = await todomodel.create({
      userid,
      todos,
    });

    res.send("added successfully");
  } catch (error) {
    res.status(400).send("error while adding todo");
  }
});

app.put("/todos", auth, async (req, res) => {
  try {
    const userid = req.userid;
    const todos = req.body.todos;

    const response = await todomodel.updateOne(
      {
        userid,
      },
      {
        $set: {
          todos,
        },
      },
      { upsert: true }
    );

    if (response) {
      res.send("updated todo successfully");
    }
  } catch (error) {
    res.status(400).send("update failed");
  }
});

app.get("/todos", auth, async (req, res) => {
  const userid = req.userid;
  try {
    const todoobject = await todomodel.findOne({
      userid,
    });

    if (todoobject) {
      res.json(todoobject.todos);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(400).send("error while getting todos");
  }
});
// app.get("/todos",  function (req, res) {
//   const userid = req.headers.userid;
//   //here we are tying to get  all the todos of the given todoid
//   let result = todo.filter((todo) => {
//     return todo.userid === userid;
//   });

//   res.json(result);
// });

// app.post("/todos",  function (req, res) {
//   const userid = req.headers.userid;
//   const task = req.body.task;
//   const iscompleted = req.body.iscompleted;
//   const todoid = req.body.todoid;

//   const isediting = req.body.isediting;
//   todo.push({
//     userid,
//     task,
//     iscompleted,
//     todoid,
//     isediting,
//   });

//   res.send("sucessfully added");
// });

// app.put("/todos", function (req, res) {
//   const userid = req.headers.userid;
//   const task = req.body.task;
//   const iscompleted = req.body.iscompleted;
//   const todoid = req.body.todoid;
//   const isediting = req.body.isediting;
//   const index = todo.findIndex((todoel) => {
//     return todoel.userid == userid && todoel.todoid == todoid;
//   });

//   todo[index].task = task;
//   todo[index].iscompleted = iscompleted;
//   todo[index].isediting = isediting;

//   res.send("successfully updated");
// });
// app.delete("/todos/:todoid", function (req, res) {
//   const userid = req.headers.userid;

//   const todoid = req.params.todoid;

//   const index = todo.findIndex((todo) => {
//     return todo.userid == userid && todo.todoid == todoid;
//   });
//   todo.splice(index, 1);
//   res.send("successfully deleted");
// });

app.listen(3000);
