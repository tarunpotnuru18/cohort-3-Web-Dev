const express = require("express");
let app = express();

let requestCount = 0;

function requestCountUpdater(req, res, next) {
  requestCount++;
  next();
}
app.use(requestCountUpdater);

app.get("/", function (req, res) {
  res.send(requestCount+"");
});
app.listen(3000);
