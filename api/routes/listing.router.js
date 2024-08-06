const express = require("express");
const {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} = require("../controllers/listing.controller");
const verifyUser = require("../utiles/verifyUser");
const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.post("/update/:id", verifyUser, updateListing);
router.get("/get/:id", getListing);

module.exports = router;
