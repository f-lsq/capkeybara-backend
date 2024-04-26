// ======================================================================================================
// ROUTE TO ADMIN PAGE
// ======================================================================================================

// Set up express
const express = require("express");

// Create a new router object
const router = express.Router()

// Create routes in the router object
router.get("/", (req, res) => {
  res.render("landing/home");
})

router.get("/about-us", (req, res) => {
  res.render("landing/about-us");
})

router.get("/contact-us", (req, res) => {
  res.render("landing/contact-us");
})


// Export out the router object
module.exports = router;