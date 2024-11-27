const express = require("express");
const courseRouter = express.Router();
const {coursemodel} = require("../db")
courseRouter.get("/preview", async (req, res) => {
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

module.exports = courseRouter;
