const express = require('express');
const app = express();
let requestCount = 0;
app.use(express.json())

app.use(function(req,res,next){

  requestCount++;
  next()


})
app.get("/add", function (req, res) {
      const a = parseInt(req.query.a)
      const b = parseInt(req.query.b)
        res.json({ans: a+b})
  });
  app.get("/subtract", function (req, res) {
      const a = parseInt(req.query.a)
      const b = parseInt(req.query.b)
        res.json({ans: a+b})
  });
  app.get("/multiply", function (req, res) {
      const a = parseInt(req.query.a)
      const b = parseInt(req.query.b)
        res.json({ans: a-b})
  });
  app.get("/divide", function (req, res) {
      const a = parseInt(req.query.a)
      const b = parseInt(req.query.b)
        res.json({ans: a/b}) 
  });
  app.get("/",function(req,res){
    res.send(`${requestCount}`)
  })

app.listen(3000)