const express = require("express");
const router = express.Router();

const {
  loginUser,
  signUpUser,
  getMembership,
  buyMembership,
  buyClass,
  getPaymentForClasses
} = require("../apiCommands/userCommands");

router.post("/loginUser", loginUser);
router.post("/SignUpUser", signUpUser);
router.get("/getMembership", getMembership);
router.post("/buyMembership", buyMembership);
router.post("/buyClass", buyClass);
router.get("/getPaymentForClasses", getPaymentForClasses);

module.exports = router;