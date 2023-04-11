const express = require("express");
const router = express.Router();

const {
  loginUser,
  signUpUser,
  getMembership,
  buyMembership,
  buyClass,
  getPaymentForClasses,
  getClasses,
  getAllGymsUser,
  getPaymentForMembership
} = require("../apiCommands/userCommands");

router.post("/loginUser", loginUser);
router.post("/SignUpUser", signUpUser);
router.get("/getMembership", getMembership);
router.post("/buyMembership", buyMembership);
router.post("/buyClass", buyClass);
router.get("/getPaymentForClasses", getPaymentForClasses);
router.get("/getClasses", getClasses);
router.get("/getAllGymsUser", getAllGymsUser);
router.get("/getPaymentForMembership", getPaymentForMembership)

module.exports = router;