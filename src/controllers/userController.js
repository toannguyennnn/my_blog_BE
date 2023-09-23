const userService = require("../service/userService");

let getUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getUser(id);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users: users,
  });
};

let createUser = async (req, res) => {
  let message = await userService.createUser(req.body);
  return res.status(200).json({
    message
  });
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = { getUser, createUser, updateUser, deleteUser };
