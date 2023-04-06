const express = require("express");
const router = express.Router();

const {
  getMembership,
} = require("../apiCommands/userCommands");

router.get("/getMembership", getMembership);

module.exports = router;