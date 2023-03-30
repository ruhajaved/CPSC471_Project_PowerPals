const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  createGym,
  updateGym,
  deleteGym,
  getAllGyms,
} = require("../apiCommands/adminCommands");

router.post("/login", loginAdmin);

router.post("/createGym", createGym);

// router.post("/updateGym", updateGym);

router.delete("/deleteGym/:id", deleteGym);

router.get("/getAllGyms", getAllGyms);

module.exports = router;
