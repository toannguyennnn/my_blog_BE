const db = require("../models/index");

const getAllUser = async (req, res) => {
  const users = await db.User.findAll();
  console.log(users)
  return res.status(200).json({
    message: "ok",
    data: users,
  });
};

module.exports = { getAllUser};
