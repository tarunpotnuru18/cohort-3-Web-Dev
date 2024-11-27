const express = require("express");
const fs = require("fs");
const rawdata = fs.readFileSync("./todo.json", "utf-8");
const data = JSON.parse(rawdata)
const app = express();
app.use(express.json()); // this to make the body sent via req object parse



function write(data){
   fs.writeFileSync("./todo.json",JSON.stringify(data))
}




app.get("/", function (req, res) {
  res.send(`no of users present currently :${data.length}`)
});

app.post("/add-user",function (req,res){
  const userid = req.body.userid;
  for(let i = 0;i<data.length;i++){
    if(data[i].userid==userid){
      res.send("user already exists")
    }
  }
  data.push({
    userid : userid,
    todo : []
  })
  write(data);
  res.send(`${userid} added successfully`)
})

app.post("/:userid/add",function(req,res){
      const userid = req.params.userid
      const todo = req.body
      let userexists = false;
      for(let i = 0;i<data.length;i++){
        if(data[i].userid==userid){
            data[i].todo.push(todo)
            write(data);
            userexists = true;
            res.send("todo added successfully")
        }
      }
      if(userexists==false){
        res.send("no such user exists")

      }
})

app.post("/:userid",function(req,res){
  const userid = req.params.userid
  const todo = req.body
  let userexists = false;
  for(let i = 0;i<data.length;i++){
    if(data[i].userid==userid){
      userexists = true;

        res.send(data)
    }
  }
  if(userexists==false){
    res.send("no such user exists")

  }
 
})

app.listen(3000);
