// ======================================================================================================
// ROUTE TO PRODUCTS
// ======================================================================================================

// Set up express
const express = require("express");
// Create a new router object
const router = express.Router()

// Require in 'Products' model
const { Product } = require("../models");
const { createProductForm } = require("../forms");

// Create routes in the router object
router.get("/", async (req, res) => {
  // Getting all the products using the product model
  const products = await Product.collection().fetch();
  // res.send(products.toJSON());
  res.render("admin/products/index", {
    products: products.toJSON()
  })
});

router.get("/add", (req, res) => {
  const productForm = createForm = createProductForm();
  res.render("admin/products/create", {
    form: productForm.toHTML() // convert Object to HTML
  })
});

// Export out the router object
module.exports = router;