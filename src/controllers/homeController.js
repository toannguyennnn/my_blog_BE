const db = require("../models/index");

const getHomepage = async (req, res) => {
  try {
    let userData = await db.User.findAll();
    let blogData = await db.Blog.findAll();
    return res.render("sample", {
      userData: JSON.stringify(userData),
      blogData: JSON.stringify(blogData),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getHomepage };
