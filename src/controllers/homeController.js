const db = require("../models/index");

const getHomepage = async (req, res) => {
  try {
    const studentList = await db.Student.findAll();
    return res.send("aaa");
  } catch (error) {
    console.log(error);
  }
};

const test = (req, res) => {
  res.render("sample");
};

module.exports = { getHomepage, test };
