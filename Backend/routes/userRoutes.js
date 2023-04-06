const express = require("express");
const router = express.Router();

const {
  getMembership,
  loginUser,
  SignUpUser
} = require("../apiCommands/userCommands");

router.get("/getMembership", getMembership);

router.post("/loginUser", loginUser);

router.post("/SignUpUser", SignUpUser);

module.exports = router;