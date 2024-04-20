// ======================================================================================================
// ROUTE TO PRODUCTS
// ======================================================================================================

// Set up express
const express = require("express");

// Create a new router object
const router = express.Router()

// Create routes in the router object
router.get("/", (req, res) => {
  res.send("All products");
})

router.get("/add", (req, res) => {
  res.send("Add product")
})

// Export out the router object
module.exports = router;