const express = require("express");
const { login, logoutUser } = require("../controller/adminController");
const router = express.Router();

router.post("/", login);

router.post("/logoutUser/:id", logoutUser);

module.exports = router;
