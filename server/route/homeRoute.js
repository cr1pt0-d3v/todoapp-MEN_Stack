const express = require("express");
const router = express.Router();

const homeCtrl = require("../controller/homeCtrl");

router.get("/", homeCtrl.home);
router.post("/add", homeCtrl.addTask);

router.get("/delete", homeCtrl.deleteTask);

router.post("/update", homeCtrl.updateTask);

module.exports = router;
