const express = require("express");
const { createListing } = require("../controllers/listing.controller");
const verifyUser = require("../utiles/verifyUser");
const router = express.Router();

router.post("/create", verifyUser, createListing);
module.exports = router;
