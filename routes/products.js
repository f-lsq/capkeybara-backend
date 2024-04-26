// ======================================================================================================
// ROUTE TO PRODUCTS
// ======================================================================================================

// Set up express
const express = require("express");
// Create a new router object
const router = express.Router()

// Require in 'Products' model
const { Product, Category } = require("../models");
const { createProductForm, bootstrapField, createSearchForm } = require("../forms");
const dataLayer = require('../dal/products');

// Create routes in the router object
router.get("/", async (req, res) => {
   // Get all the categories using the category model
  const allCategories = await dataLayer.getAllCategories();
  allCategories.unshift([0,"-----------"]); // adds an element to the top of an array

  const searchForm = createSearchForm(allCategories);
  searchForm.handle(req, {
    "success": async function(form){
      const queryBuilder = Product.collection();
      if (form.data.name) {
        queryBuilder.where('name', 'like', '%'+ form.data.name + '%')
      }

      if (form.data.min_price) {
        queryBuilder.where('price', '>=', form.data.min_price);
      }

      if (form.data.max_price) {
        queryBuilder.where('price', '<=', form.data.max_price);
      }

      if (form.data.category_id && form.data.category_id != 0) {
        queryBuilder.where('category_id', '=', form.data.category_id);
      }


      const products = await queryBuilder.fetch({
        withRelated: ['category']
      });

      res.render('landing/products/index', {
        products: products.toJSON(),
        searchForm: form.toHTML(bootstrapField) 
      });
    },
    "empty": async function(form){
      // Get all the products using the product model
      const products = await dataLayer.getAllProducts();
      // res.send(products.toJSON());
      res.render("landing/products/index", {
        products: products.toJSON(),
        searchForm: searchForm.toHTML(bootstrapField)
      })
    }, 
    "error": async function(form){
      res.render('products/index', {
        products: [],
        searchForm: form.toHTML(bootstrapField) // displays error message in 'form'
      });
    }, 
  })


});

router.get("/add", async (req, res) => {
  // Get all the categories using the category model
  const allCategories = await dataLayer.getAllCategories();
  const productForm = createProductForm(allCategories);
  res.render("landing/products/create", {
    form: productForm.toHTML(bootstrapField), // convert Object to HTML
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
  })
});

router.post("/add", (req, res) => {
  const productForm = createProductForm();

  // Handle the request using form object
  productForm.handle(req, {
    "success": async (form) => {
      const product = await dataLayer.createProduct(form.data);

      // Flash message added to current session
      req.flash('success_messages','New product has been created successfully');

      res.redirect("/products/");
    },
    "empty": (form) => {
      res.render("landing/products/create", {
        form: form.toHTML(bootstrapField)
      })
    },
    "error": (form) => {
      res.render("landing/products/create", {
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

  // Get all categories
  const allCategories = await dataLayer.getAllCategories();
  
  // Create the product form and pre-fill all fields
  const productForm = createProductForm(allCategories);
  productForm.fields.name.value = product.get("name");
  productForm.fields.description.value = product.get("description");
  productForm.fields.price.value = product.get("price");
  productForm.fields.cost.value = product.get("cost");
  productForm.fields.quantity.value = product.get("quantity");

  res.render("landing/products/update",{
    "form": productForm.toHTML(bootstrapField),
    "product": product.toJSON(),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
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
      res.render("landing/products/update", {
        form: form.toHTML(bootstrapField)
      })
    },
    "error": (form) => {
      res.render("landing/products/update", {
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

  res.render("landing/products/delete", {
    product: product.toJSON()
  })
})

router.post('/delete/:productId', async (req, res) => {
  const product = await Product.where({
    "id": req.params.productId
  }).fetch({
    required: true
  })

  req.flash('error_messages',`${product.get('name')} has been deleted`);
  await product.destroy();
  res.redirect("/products");
})

// Export out the router object
module.exports = router;