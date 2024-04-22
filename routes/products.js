// ======================================================================================================
// ROUTE TO PRODUCTS
// ======================================================================================================

// Set up express
const express = require("express");
// Create a new router object
const router = express.Router()

// Require in 'Products' model
const { Product, Category } = require("../models");
const { createProductForm, bootstrapField } = require("../forms");

// Create routes in the router object
router.get("/", async (req, res) => {

  // Get all the products using the product model
  const products = await Product.collection().fetch({
    withRelated: ['category']
  });
  // res.send(products.toJSON());
  res.render("admin/products/index", {
    products: products.toJSON()
  })
});

router.get("/add", async (req, res) => {
  // Get all the categories using the category model
  const allCategories = await Category.fetchAll().map(category => [category.get("id"), category.get("name")]);
  const productForm = createProductForm(allCategories);
  res.render("admin/products/create", {
    form: productForm.toHTML(bootstrapField) // convert Object to HTML
  })
});

router.post("/add", (req, res) => {
  const productForm = createProductForm();

  // Handle the request using form object
  productForm.handle(req, {
    "success": async (form) => {
      // Creates an instance of the product model - represents ONE ROW in the products table
      const product = new Product();
      product.set(form.data);
      // Save the newly created product to the DB
      await product.save();

      res.redirect("/products/");
    },
    "empty": (form) => {
      res.render("admin/products/create", {
        form: form.toHTML(bootstrapField)
      })
    },
    "error": (form) => {
      res.render("admin/products/create", {
        form: form.toHTML(bootstrapField)
      })
    }
  })
});

router.get("/edit/:productId", async (req, res) => {
  // Fetches the product to be updated
  const product = await Product.where({
    "id": req.params.productId
  }).fetch({
    required: true // make sure the product exists
  })

  // Create the product form and pre-fill all fields
  const productForm = createProductForm();
  productForm.fields.name.value = product.get("name");
  productForm.fields.description.value = product.get("description");
  productForm.fields.price.value = product.get("price");
  productForm.fields.cost.value = product.get("cost");
  productForm.fields.quantity.value = product.get("quantity");

  res.render("admin/products/update",{
    "form": productForm.toHTML(bootstrapField),
    "product": product.toJSON()
  })
})

router.post("/edit/:productId", async (req, res) => {
  const productForm = createProductForm();

  // Handle the request using form object
  productForm.handle(req, {
    "success": async (form) => {
      // Fetches the product to be updated
      const product = await Product.where({
        "id": req.params.productId
      }).fetch({
        required: true // make sure the product exists
      });

      product.set(form.data);
      await product.save();
      res.redirect("/products/");
      

    },
    "empty": (form) => {
      res.render("admin/products/update", {
        form: form.toHTML(bootstrapField)
      })
    },
    "error": (form) => {
      res.render("admin/products/update", {
        form: form.toHTML(bootstrapField)
      })
    }
  })
})

router.get('/delete/:productId', async (req, res) => {
  const product = await Product.where({
    "id": req.params.productId
  }).fetch({
    required: true
  })

  res.render("admin/products/delete", {
    product: product.toJSON()
  })
})

router.post('/delete/:productId', async (req, res) => {
  const product = await Product.where({
    "id": req.params.productId
  }).fetch({
    required: true
  })

  await product.destroy();
  res.redirect("/products");
})

// Export out the router object
module.exports = router;