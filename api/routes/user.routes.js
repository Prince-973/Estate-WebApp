const express = require("express");
const { test, updateUserinfo } = require("../controllers/user.controller");
const verifyUser = require("../utiles/verifyUser");

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyUser, updateUserinfo);

module.exports = router;
