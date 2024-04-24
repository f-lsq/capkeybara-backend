// ======================================================================================================
// ROUTE TO MAIN PAGE, FOR CUSTOMERS
// ======================================================================================================

// Set up express
const express = require("express");

// Create a new router object
const router = express.Router()

const { Product, Category } = require("../models");

// Create routes in the router object
router.get("/", async (req, res) => {

  // Get all the products using the product model
  const products = await Product.collection().fetch({
    withRelated: ['category']
  });
  // res.send(products.toJSON());
  res.json({
    products: products.toJSON()
  })
});


// Export out the router object
module.exports = router;