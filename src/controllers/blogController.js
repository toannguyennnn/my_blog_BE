const blogService = require("../service/blogService");

let getBlog = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let blogs = await blogService.getBlog(id);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    blogs: blogs,
  });
};

let createBlog = async (req, res) => {
  let message = await blogService.createBlog(req.body);
  return res.status(200).json({
    message,
  });
};

// const updateUser = async (req, res) => {
//   let message = await userService.updateUser(req.params.id, req.body);
//   return res.status(200).json({
//     message,
//   });
// };

// const deleteUser = async (req, res) => {
//   let id = req.params.id;
//   let message = await userService.deleteUser(id);
//   return res.status(200).json({
//     message,
//   });
// };

module.exports = { getBlog, createBlog };
