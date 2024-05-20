const express = require('express');
const router = express.Router();

const buyerServiceLayer = require('../../service-layer/buyers');
const cartServiceLayer = require('../../service-layer/cart');
const productServiceLayer = require('../../service-layer/products');
const { checkIfAuthenticatedJWT } = require('../../middlewares');

// Gets all the cart items of a buyer
router.get('/:buyerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { buyerId } = req.params;
    const cartItems = await cartServiceLayer.getCartItem(buyerId);
    if (req.payload.id === Number(buyerId)) {
      res.status(200).json({
        "success": `Cart items for buyer ID ${buyerId} found`,
        cartItems
      })
    } else {
      res.status(403).json({
        "error": "Access denied: you can only access your own cart items"
      })
    }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Creates a new cart item, or
// Increate cart item quantity by 1
router.post('/:buyerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { buyerId } = req.params;
    const  productId = req.body.product_id;
    if (req.payload.id === Number(buyerId)) {
      const existingProduct = await productServiceLayer.getProductById(productId);
      if (existingProduct) {
        const newCartItem = await cartServiceLayer.addToCart(buyerId, productId, 1);
        if (newCartItem) {
          res.status(200).json({
            "success": `Cart items of ID ${productId} added for buyer ID ${buyerId}`,
            newCartItem
          })
        } else {
          res.status(400).json({
            "error": `Quantity to be added exceeded quantity available for product of ID ${productId}`
          })
        }   
      } else {
        res.status(404).json({
          "error": `Product of ID ${productId} does not exist`
        })  
      }
    } else {
      res.status(403).json({
        "error": "Access denied: you can only access your own cart items"
      })
    }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Reduce cart item quantity by 1
router.post('/remove/:buyerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { buyerId } = req.params;
    const productId = req.body.product_id;
    if (req.payload.id === Number(buyerId)) {
      const existingProduct = await productServiceLayer.getProductById(productId);
      if (existingProduct) {
        const existingCartItem = await cartServiceLayer.removeFromCart(buyerId, productId);
        if (existingCartItem) {
          res.status(200).json({
            "success": `Cart item of ID ${productId} removed by 1 for buyer ID ${buyerId}`,
            existingCartItem
          })
        } else {
          res.status(400).json({
            "error": `Cart item of ID ${productId} either do not exist or cannot have negative quantity`
          })
        }
      } else {
        res.status(404).json({
          "error": `Product of ID ${productId} does not exist`
        })  
      }
    } else {
      res.status(403).json({
        "error": "Access denied: you can only access your own cart items"
      })
    }  
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Update quantity of a cart item (ambiguous)
router.put('/:buyerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { buyerId } = req.params;
    const  { ...data } = req.body;
    if (req.payload.id === Number(buyerId)) {
      const existingProduct = await productServiceLayer.getProductById(data.product_id);
      if (existingProduct) {
        const updatedCartItem = await cartServiceLayer.updateCartItemQuantity(buyerId, data.product_id, data.new_quantity);
        if (updatedCartItem) {
          res.status(200).json({
            "success": `Cart items of ID ${data.product_id} updated for buyer ID ${buyerId}`,
            updatedCartItem
          })
        } else {
          res.status(400).json({
            "error": `Quantity to be added exceeded quantity available for product of ID ${data.product_id}`
          })
        } 
      } else {
        res.status(404).json({
          "error": `Product of ID ${data.product_id} does not exist`
        })  
      }
    } else {
      res.status(403).json({
        "error": "Access denied: you can only access your own cart items"
      })
    }  
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Remove a cart item entirely
router.delete('/:buyerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { buyerId } = req.params;
    const  productId = req.body.product_id;
    if (req.payload.id === Number(buyerId)) {
      const existingProduct = await productServiceLayer.getProductById(productId);
      if (existingProduct) {
        const removedCartItem = await cartServiceLayer.removeCartItem(buyerId, productId);
        if (removedCartItem) {
          res.status(200).json({
            "success": `Cart item of ID ${productId} removed for buyer ID ${buyerId}`,
            removedCartItem
          })
        } else {
          res.status(400).json({
            "error": `Cart items of ID ${productId} was not removed for buyer ID ${buyerId}`
          })
        }
      } else {
        res.status(404).json({
          "error": `Product of ID ${productId} does not exist`
        })  
      }
    }  else {
      res.status(403).json({
        "error": "Access denied: you can only access your own cart items"
      })
    }  
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

module.exports = router;