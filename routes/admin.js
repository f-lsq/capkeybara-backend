// ======================================================================================================
// ROUTE TO ADMIN PAGE
// ======================================================================================================

// Set up express
const express = require("express");

// Create a new router object
const router = express.Router()

// Create routes in the router object
router.get("/", (req, res) => {
  res.render("admin/home");
})

router.get("/login", (req, res) => {
  res.render("admin/login");
})

router.get("/register", (req, res) => {
  res.render("admin/register");
})


// Export out the router object
module.exports = router;