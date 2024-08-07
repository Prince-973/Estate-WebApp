const express = require("express");
const {
  test,
  updateUserinfo,
  deleteUser,
  getUserListing,
  getUser,
} = require("../controllers/user.controller");
const verifyUser = require("../utiles/verifyUser");

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyUser, updateUserinfo);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/listings/:id", verifyUser, getUserListing);
router.get("/:id", verifyUser, getUser);

module.exports = router;
