const express = require('express');
const router = express.Router();

const buyerServiceLayer = require('../../service-layer/buyers');
const cartServiceLayer = require('../../service-layer/cart');
const orderServiceLayer = require('../../service-layer/orders');
const productServiceLayer = require('../../service-layer/products');
const { checkIfAuthenticatedJWT } = require('../../middlewares');

// Gets all orders of a buyer
router.get('/:buyerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { buyerId } = req.params;
    const existingBuyer = await buyerServiceLayer.getBuyerById(buyerId);
    if (existingBuyer) {
      const allOrders = await orderServiceLayer.getAllBuyerOrders(buyerId);
      if (allOrders) {
        res.status(200).json({
          "success": `All orders for buyer ID ${buyerId} found`,
          allOrders
        })
      }
    } else {
      res.status(404).json({
        "error": `Buyer of ID ${buyerId} does not exist`
      })
    }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Gets all orders of a seller
router.get('/seller/:sellerId', checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (req.payload.id === Number(sellerId)) {
      const allOrders = await orderServiceLayer.getAllSellerOrders(sellerId);
      if (allOrders) {
        res.status(200).json({
          "success": `All orders with seller ID ${sellerId} found`,
          allOrders
        })
      }
    } else {
      res.status(403).json({
        "error": "Access denied: you can only access your own orders"
      })
    }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Creates a new order
router.post('/:buyerId', async (req, res) => {
  try {
    const { buyerId } = req.params;
    // Create a new order first (to get order id)
    const subtotalQty = await cartServiceLayer.getCartSubtotalAndQuantity(buyerId);
    const existingBuyer = await buyerServiceLayer.getBuyerById(buyerId);
    let newOrder = await orderServiceLayer.createOrder({
      buyer_id: buyerId,
      subtotal: subtotalQty[0],
      total_quantity: subtotalQty[1],
      shipping_cost: 2,
      shipping_address: existingBuyer.get('address'), 
      order_status: "Payment Made",
      date_created: new Date(),
    })
    newOrder = newOrder.toJSON();

    // Create all the order items using cart items, 
    // while also updating quantity avaialble and sold for the products
    let cartItems = await cartServiceLayer.getCartItem(buyerId);
    cartItems = cartItems.toJSON();
    cartItems.forEach(async (cartItem) => {
      await orderServiceLayer.createOrderItem(
        newOrder.id, 
        cartItem.product_id,
        cartItem.quantity
      )
      const responseProduct = await productServiceLayer.getProductById(cartItem.product_id);
      await productServiceLayer.updateProduct(cartItem.product_id, {
        quantity_available: responseProduct.quantity_available - cartItem.quantity,
        quantity_sold: responseProduct.quantity_sold + cartItem.quantity
      })
    })

    // Clear cart after order is created
    cartItems = await cartServiceLayer.clearCartItems(buyerId);

    res.status(200).json({
      "success": `New order created for buyer ID ${buyerId}`,
      newOrder
    })
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

// Update an order status
router.put('/:orderId', async (req, res) => {
  try {
      const { orderId } = req.params;
      const { order_status } = req.body;
      const existingOrder = await orderServiceLayer.getOrder(orderId);
      if (existingOrder) {
        const updatedOrder = await orderServiceLayer.updateOrderStatus(orderId, order_status);
        if (updatedOrder) {
          res.status(200).json({
            "success": `Order status updated for order ID ${orderId}`,
            updatedOrder
          })
        } else {
          res.status(400).json({
            "error": `Order status was not updated for order ID ${orderId}`
          })
        }
      } else {
        res.status(404).json({
          "error": `Order of ID ${orderId} does not exist`
        })
      }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

module.exports = router;