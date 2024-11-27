const express = require("express");
//for creating a router
const userRouter = express.Router();

// exporting the required libraries
//database

const { usermodel, adminmodel, coursemodel, purchasemodel } = require("../db");

//validation
const { z } = require("zod");

//hashing
const bcrypt = require("bcrypt");

//authentication
const jwt = require("jsonwebtoken");
const { users_secretkey: jwt_secret } = require("../config");
// user routes
const auth= require("../middleware/users")
/* function auth(req, res, next) {
  const token = req.headers.token;
  try {
    const userid = jwt.verify(token, jwt_secret).userid;
    req.userid = userid;
    console.log("user id form auth", userid);
    next();
  } catch (error) {
    res.status(401).send("authentication error");
  }
} */

userRouter.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const requiredStructure = z.object({
    email: z.string().min(5).max(50).email(),
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(30),
  });
  const validationResult = requiredStructure.safeParse(req.body);

  if (!validationResult.success) {
    res.status(401).json({
      message: "your credentials are not in correct format",
      error: validationResult.error,
    });

    return;
  }
  try {
    const hashedpassword = await bcrypt.hash(password, 5);

    const user = await usermodel.create({
      email,
      password: hashedpassword,
      username,
    });
    if (user) {
      const createpurchase = await purchasemodel.create({
        userid: user._id,
      });
      res.send("successfully signed up");
    }
  } catch (error) {
    res.status(400).send("error while signing you up :(");
    console.log(error);
  }
});

userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const requiredStructure = z.object({
    email: z.string().max(50).min(3).email(),
    password: z.string().max(50).min(3),
  });

  const validationResult = requiredStructure.safeParse(req.body);
  if (!validationResult.success) {
    res.status(401).json({
      message: "provided credentials are not in right format",
      error: validationResult.error,
    });
    return;
  }

  try {
    const hashedpassword = await usermodel.findOne({
      email,
    });

    const match = await bcrypt.compare(password, hashedpassword.password);

    if (match) {
      const token = jwt.sign(
        {
          userid: hashedpassword._id,
        },
        jwt_secret
      );

      res.json(token);
    } else {
      res.status(401).send("provided credentials are wrong");
    }
  } catch (error) {
    res.status(400).send("error while signing you in :(");
  }
});
userRouter.post("/buy/:courseid", auth, async (req, res) => {
  try {
    const userid = req.userid;
    console.log("user id from /course endpoint", userid);
    const courseid = req.params.courseid;
    console.log("courseid", courseid);
    const response = await purchasemodel.updateOne(
      {
        userid,
      },
      {
        $push: { purchases: courseid },
      }
    );
    if (response) {
      console.log("response from the courses buy endpoing", response);
      res.send("sucessfully purchased");
    }
  } catch (error) {
    console.error(error);
    res.status(401).send("purchase failed");
  }
});
userRouter.get("/purchases", auth, async (req, res) => {
  const userid = req.userid;
  try {
    const response = await purchasemodel.findOne({
      userid,
    });
    const purchases = response.purchases;
    if (purchases.length === 0) {
      res.json({
        message: "currently there is nothing to show",
        purchases,
      });
    } else {
      res.json({
        message: "thanks for purchasing courses",
        purchases,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error occured while getting your courses");
  }
});
userRouter.get("/courses", async (req, res) => {
  const courses = await coursemodel.find({});
  if (courses.length === 0) {
    res.json({
      message: "currently there are no courses, please contact admin :)",
      courses,
    });
  } else {
    res.json({
      message: "here are the courses",
      courses,
    });
  }
});
module.exports = userRouter;
