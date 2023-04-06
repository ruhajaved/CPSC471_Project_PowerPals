const express = require("express");
const router = express.Router();

const {
  getMembership,
  buyMembership,
  buyClass
} = require("../apiCommands/userCommands");

router.get("/getMembership", getMembership);
router.post("/buyMembership", buyMembership);
router.post("/buyClass", buyClass);

module.exports = router;