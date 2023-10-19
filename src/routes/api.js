const express = require("express");
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

const initAPIRoute = (app) => {
  // authorization
  router.post("/sign-up", authController.signUp);
  router.post("/log-in", authController.logIn);

  // user
  router.get("/users/:id", requireAuth, userController.getUser);
  router.post("/create-user", userController.createUser);
  router.put("/edit-user/:id", userController.updateUser);
  router.delete("/delete-user/:id", userController.deleteUser);

  // blog
  router.get("/blogs/:id", blogController.getBlog);
  router.post("/create-blog", blogController.createBlog);
  router.delete("/delete-blog/:id", blogController.deleteBlog);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
