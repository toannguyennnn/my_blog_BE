const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users/:id", userController.getUser);
  router.post("/create-user", userController.createUser);
  router.put("/edit-user/:id", userController.updateUser);
  router.delete("/delete-user/:id", userController.deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
