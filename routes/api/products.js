const express = require('express')
const router = express.Router();

const productServiceLayer = require('../../service-layer/products');
const sellerServiceLayer = require('../../service-layer/sellers');
const { checkIfAuthenticatedJWT } = require('../../middlewares');

const validateProductData = (data) => {
  const requiredFields = [
    "name", 
    "price", 
    "cost", 
    "quantity_available", 
    "image_url", 
    "category_id", 
    "seller_id"
  ]

  // Check for missing fields
  const missingFields = requiredFields.filter((requiredField) => !data[requiredField]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields (${missingFields.join(', ')})`);
  }
}

// Gets all products information
router.get('/', async (req, res) => {
  try {
    const allProducts = await productServiceLayer.getAllProducts();
    res.status(200).json({
      allProducts
    });
  } catch (e) {
    res.status(500).json({
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
    res.status(500).json({
      "error": e.message
    })
  }
})

// Get all products by sellers
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const existingSeller = await sellerServiceLayer.getSellerById(sellerId);
    if (existingSeller) {
      const sellerProducts = await productServiceLayer.getProductBySeller(sellerId);
      res.status(200).json({
        "success": `Product of Seller ID ${sellerId} has been found`,
        "sellerProducts": sellerProducts
      }) 
    } else {
      res.status(404).json({
        "error": `Seller of ID ${sellerId} not found`
      })
    }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Creates a new product
router.post('/', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { ...productData } = req.body;
    validateProductData(productData);

    const newProduct = await productServiceLayer.createProduct(productData);
    res.status(200).json({
      "success": "New product created successfully",
      newProduct
    })
  } catch (e) {
    if (e.message.startsWith('Missing required fields')) {
      res.status(400).json({
        "error": e.message
      });
    } else {
    res.status(500).json({
      "error": e.message
    })
  }}
})

// Get an existing product by ID
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productServiceLayer.getProductById(productId);
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
    res.status(500).json({
      "error": e.message
    })
  }
})

// Update an existing product
router.put('/:productId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { productId } = req.params;
    const { ...newProductData } = req.body;
    const updatedProduct = await productServiceLayer.updateProduct(productId, newProductData);
    validateProductData(newProductData);
    if (updatedProduct) {
      res.status(200).json({
        "success": `Product of ID ${productId} has been updated`,
        "updatedProduct": updatedProduct
      })
    } else {
      res.status(404).json({
        "error": `Product of ID ${productId} cannot be updated as it does not exist`
      })
    }
  } catch(e) {
    if (e.message.startsWith('Missing required fields')) {
      res.status(400).json({
        "error": e.message
      })
    } else if (e.message.startsWith('Invalid field name')) {
      res.status(400).json({
        "error": e.message
      });
    } else {
    res.status(500).json({
      "error": e.message
    })}
  }
})

// Delete an existing product
router.delete('/:productId', checkIfAuthenticatedJWT, async (req, res) => {
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
        "error": `Product of ID ${productId} cannot be deleted as it does not exist`
      })
    }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

module.exports = router;