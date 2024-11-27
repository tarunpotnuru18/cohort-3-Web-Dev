/* const url = "https://jsonplaceholder.typicode.com/posts"

async function time (url) {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
}
time(url);
console.error("this is an error") */
/* const express = require("express");

const app = express();

// Example data
let userData = []; // Populate this with user data as needed

// Middleware function
function userCheck(req, res, next) {
  const userid = req.params.user;
   console.log(userid)
  if (userData.length === 0) {
    res.send("There are no users currently. Be the first one to register!");
    return;
  }

  // Logic to find user here
  next(); // Call next() to continue to the next middleware/route
}

// Apply the middleware globally or to specific routes
app.use("/:user",userCheck);

app.get("/:user", function (req, res) {
  res.send("User found"); // Sample response
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
 */
const path = require('path')
const express=  require('express')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname , "public")))
console.log(__dirname)



app.listen(3000)
