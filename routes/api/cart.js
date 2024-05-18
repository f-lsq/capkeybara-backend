const express = require('express');
const router = express.Router();

const cartServiceLayer = require('../../service-layer/cart');
const { checkIfAuthenticatedJWT } = require('../../middlewares');

// Gets all the cart items of a buyer
router.get('/:buyerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { buyerId } = req.params;
    const cartItems = await cartServiceLayer.getCartItem(buyerId);
    if (cartItems) {
      res.status(200).json({
        "success": `Cart items for buyer ID ${buyerId} found`,
        cartItems
      })
    } else {
      res.status(400).json({
        "error": `Cart items for buyer ID ${buyerId} was not found`
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

  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

module.exports = router;