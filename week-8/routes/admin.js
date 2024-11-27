const express = require("express");
const adminRouter = express.Router();

const { adminmodel, coursemodel } = require("../db");

//validation
const { z } = require("zod");

//hashing
const bcrypt = require("bcrypt");

//authentication
const jwt = require("jsonwebtoken");
const { admin_secretkey: jwt_secret } = require("../config");
//middleware
const auth = require("../middleware/admin");

//routes
adminRouter.post("/signup", async (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  const email = req.body.email;
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

    const response = await adminmodel.create({
      username,
      password: hashedpassword,
      email,
    });

    if (response) {
      res.send("successfully signed up");
    }
  } catch (error) {
    res.status(400).send("error while signing you up ");
  }
});

adminRouter.post("/signin", async (req, res) => {
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
    const hashedpassword = await adminmodel.findOne({
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

adminRouter.post("/course", auth, async (req, res) => {
  const name = req.body.name;
  const content = req.body.content;
  const price = req.body.price;
  const creator = req.userid;
  const description = req.body.description;
  try {
    const response = await coursemodel.create({
      name,
      content,
      price,
      creator,
      description,
    });
    if (response) {
      res.send("course creation successful");
    }
  } catch (error) {
    res.send("error while creating a course");
  }
});
adminRouter.get("/courses", auth, async (req, res) => {
  try {
    const courses = await coursemodel.find({
      creator: req.userid,
    });

    if (courses) {
      res.json({
        message: "courses successfully fetched",
        courses: courses,
      });
    }
  } catch (error) {
    res.send("error while getting the courses");
  }
});
adminRouter.put("/course/:courseid", auth, async (req, res) => {
  const { name, content, description, price, creator } = req.body;
  const courseid = req.params.courseid;
  console.log(courseid)
  try {
    const response = await coursemodel.updateOne(
      {
       _id: courseid,
      },
      {
        $set: {
          name,
          content,
          description,
          price,
          creator,
        },
      }
    );
    if (response) {
      console.log(response)
      res.send("course updation was successful");
    }
  } catch (error) {
    res.send("course updation failed");
  }
});

module.exports = adminRouter;
