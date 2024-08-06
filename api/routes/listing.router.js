const express = require("express");
const {
  createListing,
  deleteListing,
} = require("../controllers/listing.controller");
const verifyUser = require("../utiles/verifyUser");
const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);

module.exports = router;
