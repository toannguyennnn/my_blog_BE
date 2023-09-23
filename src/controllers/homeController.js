const db = require("../models/index");

const getHomepage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("sample", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getHomepage };
