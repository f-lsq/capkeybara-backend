const express = require('express')
const router = express.Router();

const productServiceLayer = require('../../service-layer/products');

// Gets all products information
router.get('/', async (req, res) => {
  try {
    const allProducts = await productServiceLayer.getAllProducts();
    res.status(200).json({
      allProducts
    });
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
  
})

// Gets all product categories
router.get('/categories', async (req, res) => {
  try {
    const allCategories = await productServiceLayer.getAllCategories();
    res.status(200).json({
      allCategories
    });
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
  
})



// Get all products by sellers
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const sellerProducts = await productServiceLayer.getProductBySeller(sellerId);
    if (sellerProducts) {
      res.status(200).json({
        "success": `Product of Seller ID ${sellerId} has been found`,
        "sellerProducts": sellerProducts
      })
    } else {
      res.status(404).json({
        "error": `No product of Seller ID ${sellerId} found`
      })
    }
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Creates a new product
router.post('/', async (req, res) => {
  try {
    const { ...productData } = req.body;
    const newProduct = await productServiceLayer.createProduct(productData);
    res.status(200).json({
      newProduct
    })
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Get an existing product by ID
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productServiceLayer.getProductById(productId)
    if (existingProduct) {
      res.status(200).json({
        "success": `Product of ID ${productId} has been found`,
        "existingProduct": existingProduct
      })
    } else {
      res.status(404).json({
        "error": `No product of ID ${productId} found`
      })
    }
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Update an existing product
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { ...newProductData } = req.body;
    const updatedProduct = await productServiceLayer.updateProduct(productId, newProductData);
    if (updatedProduct) {
      res.status(200).json({
        "success": `Product of ID ${productId} has been updated`,
        "updatedProduct": updatedProduct
      })
    } else {
      res.status(404).json({
        "error": "Cannot update product that does not exist"
      })
    }
  } catch(e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Delete an existing product
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await productServiceLayer.deleteProduct(productId);
    if (deletedProduct) {
      res.status(200).json({
        "success": `Product of ID ${productId} has been deleted`,
        "deletedProduct": deletedProduct
      })
    } else {
      res.status(404).json({
        "error": "Cannot delete product that does not exist"
      })
    }
    
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

module.exports = router;