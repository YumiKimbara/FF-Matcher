const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/me", authController.getMe);

// router.get("/login", authController.postLogin);

// router.get("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

router.get("/logout", authController.postLogout);

router.post("/logout", authController.postLogout);

module.exports = router;
