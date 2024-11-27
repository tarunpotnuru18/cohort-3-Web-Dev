const express = require('express')
const cors  = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const date = new Date()
let noOfRequests = 0;
function requestCounter(req,res,next){
    const p = req.params.userid
    noOfRequests++;
    console.log(`the request is came from the url ${req.hostname} ${req.originalUrl}  via  ${req.method} and at ${date}`)
    next()
}
app.use(requestCounter)
app.get("/home",function(req,res){
     res.send("you are in home page")
})
app.get("/payments",function(req,res){
    res.send("you are in payments page")
})
app.get("/requests",function(req,res){
    res.send(`no of requests ${noOfRequests}`)
})
app.post("/",function(req,res){
    const a = req.body.a
    res.send(`${a}`)
})
app.listen(3000,()=>{
    console.log("we are up and running on port no 3000, lets kick things off")
})