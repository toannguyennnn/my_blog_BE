const express = require("express");
const UserController = require("../controllers/userController");
const BlogController = require("../controllers/blogController");
const AuthController = require("../controllers/authController");
const AuthMiddleware = require("../middleware/authMiddleware");

const userController = new UserController();
const blogController = new BlogController();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

const router = express.Router();

const initAPIRoute = (app) => {
  router.all(
    "*",
    authMiddleware.requireAuth.bind(authMiddleware),
    authMiddleware.requirePermission.bind(authMiddleware)
  );

  // authorization
  router.post("/sign-up", authController.signUp);
  router.post("/log-in", authController.logIn);

  // user
  router.get("/users/:id", userController.getUser);
  router.post("/create-user", userController.createUser);
  router.put("/edit-user/:id", userController.updateUser);
  router.delete("/delete-user/:id", userController.deleteUser);

  // blog
  router.get("/blogs/:id", blogController.getBlog);
  router.post("/create-blog", blogController.createBlog);
  router.put("/edit-blog/:id", blogController.updateBlog);
  router.delete("/delete-blog/:id", blogController.deleteBlog);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
