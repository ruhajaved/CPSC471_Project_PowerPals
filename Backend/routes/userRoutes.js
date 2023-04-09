const express = require("express");
const router = express.Router();

const {
  loginUser,
  signUpUser,
  getMembership,
  buyMembership,
  buyClass,
  getPaymentForClasses,
  customerSeeClasses
} = require("../apiCommands/userCommands");

router.post("/loginUser", loginUser);
router.post("/SignUpUser", signUpUser);
router.get("/getMembership", getMembership);
router.post("/buyMembership", buyMembership);
router.post("/buyClass", buyClass);
router.get("/getPaymentForClasses", getPaymentForClasses);
router.get("/customerSeeClasses", customerSeeClasses);

module.exports = router;