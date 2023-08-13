const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userData, verifytoken } = require("../controller/loginController");

router.post("/", registerUser);

router.post("/login", loginUser);

router.post("/dashboard", verifytoken, userData);

module.exports = router;
