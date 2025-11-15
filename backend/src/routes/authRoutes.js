const express = require("express");
const { register } = require("../controllers/authController/Register.js");
const { login } = require("../controllers/authController/Login.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
