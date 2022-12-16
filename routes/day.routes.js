const express = require("express");
const router = express.Router();
const {
  getAllDaysController,
  getDayByIdController,
  createDayController,
} = require("../controllers/day.controller");

router.get("/all", getAllDaysController);

router.get("/all/:id", getDayByIdController);

router.post("/create-day", createDayController);

router.put("/all/:id",(req,res)=>{
})

module.exports = router;
