const express = require("express");
const { getHomepage, test } = require("../controllers/homeController");

const router = express.Router();

router.get("/", getHomepage);
router.get("/test", test);

module.exports = router;
