const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")
const User = require("../models/user.model");
const { loginController, signUpController } = require("../controllers/auth.controller");


router.post("/register",signUpController)

router.post("/login",loginController)

module.exports = router;