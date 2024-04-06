
const express = require("express");

const {Tokencheakmidileware} = require("../middleware/authmiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantcon");

const router = express.Router();

//routes
// CRAETE RESTURANT || POST
router.post("/create", Tokencheakmidileware, createResturantController);

// GET ALL RESTURANTS || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", getResturantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id",Tokencheakmidileware , deleteResturantController);

module.exports = router;
