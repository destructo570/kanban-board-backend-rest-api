const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const { signupValidator } = require("../middleware/validators");

router.post("/signup", signupValidator, authController.signup);
router.post("/login", authController.login);

module.exports = router;
