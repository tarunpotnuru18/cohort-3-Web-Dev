const jwt = require("jsonwebtoken")
const {admin_secretkey:jwt_secret} = require("../config");
async function auth(req, res, next) {
    const token = req.headers.token;
  
    try {
      const response = jwt.verify(token, jwt_secret);
      if (response) {
        req.userid = response.userid;
        next();
      }
    } catch (error) {
      res.send("error while authenticating");
     
    }
  }
module.exports = auth