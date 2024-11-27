const express = require('express');
const app = express();
app.use(express.json())
app.use(function(req,res,next){
      let method = req.method;
      let url = req.hostname
      let date = new Date();
     console.log(date);

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

app.listen(3000)