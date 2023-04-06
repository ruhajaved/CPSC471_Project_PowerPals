const express = require("express");
const router = express.Router();

const {
  loginUser,
  SignUpUser,
  //updateGym,
  //deleteGym,
  //getAllGyms,

  create
} = require("../apiCommands/userCommands");

router.post("/login", loginUser);

router.post("/SignUpUser", SignUpUser);

// router.post("/updateGym", updateGym);

//router.delete("/deleteGym/:id", deleteGym);

//router.get("/getAllGyms", getAllGyms);

module.exports = router;
