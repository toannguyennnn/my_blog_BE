const express = require("express");
const {
  getAllUser,
  // createUser,
  // updateUser,
  // deleteUser,
} = require("../controllers/APIController");

const router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", getAllUser);
  // router.post("/create-user", createUser);
  // router.put("/edit-user", updateUser);
  // router.delete("/delete-user/:id", deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
