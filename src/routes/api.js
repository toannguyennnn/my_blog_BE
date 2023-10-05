const express = require("express");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");

const router = express.Router();

const initAPIRoute = (app) => {
  // user 
  router.get("/users/:id", userController.getUser);
  router.post("/create-user", userController.createUser);
  router.put("/edit-user/:id", userController.updateUser);
  router.delete("/delete-user/:id", userController.deleteUser);

  // blog
  router.get("/blogs/:id", blogController.getBlog);
  router.post("/create-blog", blogController.createBlog);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
