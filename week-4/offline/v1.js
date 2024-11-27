// this is for the offline of week -4 code
const express = require("express");
const app = express();
var users = [
  {
    name: "john",
    kidneys: [{ healthy: false }],
  },
];
console.log(users[0]);
app.get("/", function (req, res) {
  let test = users[0].kidneys;
  let no = test.length;
  let healthy = 0;
  for (let i = 0; i < test.length; i++) {
    if (test[i].healthy === true) {
      healthy++;
    }
  }
  res.send(`you have ${no} kidneys and ${healthy} healthy kidneys`);
});
app.post("/", function (res, req) {});
app.put("/", function (res, req) {});
app.delete("/", function (res, req) {});

app.listen(3000);
