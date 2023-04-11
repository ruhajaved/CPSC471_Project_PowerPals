const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  createGym,
  updateGym,
  deleteGym,
  getAllGyms,
  getAllInstructors,
  createInstructor,
  updateInstructor,
  getAllClasses,
  createClass,
  deleteClass,
  updateClass,
  getAllCategories,
  createCategory,
  deleteCategory,
} = require("../apiCommands/adminCommands");

router.post("/login", loginAdmin);

//Gym Routes
router.post("/createGym", createGym);

router.delete("/deleteGym/:id", deleteGym);

router.get("/getAllGyms", getAllGyms);

router.patch("/updateGym/:id", updateGym);

//Instructor Routes

router.get("/getAllInstructors", getAllInstructors);

router.post("/createInstructor", createInstructor);

router.patch("/updateInstructor/:id", updateInstructor);

//Class routes

router.get("/getAllClasses", getAllClasses);

router.post("/createClass", createClass);

router.delete("/deleteClass/:id", deleteClass);

router.patch("/updateClass/:id", updateClass);

//Category Routes

router.get("/getAllCategories", getAllCategories);

router.post("/createCategory", createCategory);

router.delete("/deleteCategory/:categoryName", deleteCategory);

module.exports = router;
