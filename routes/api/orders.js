const express = require('express');
const router = express.Router();

const cartServiceLayer = require('../../service-layer/cart');
const productServiceLayer = require('../../service-layer/products');
const orderServiceLayer = require('../../service-layer/orders');
const { checkIfAuthenticatedJWT } = require('../../middlewares');

// Gets all orders of a buyer
router.get('/:buyerId', async (req, res) => {
  try {
    const { buyerId } = req.params;
    const allOrders = await orderServiceLayer.getAllOrders(buyerId);
    if (allOrders) {
      res.status(200).json({
        "success": `All orders for buyer ID ${buyerId} found`,
        allOrders
      })
    } else {
      res.status(400).json({
        "error": `All orders for buyer ID ${buyerId} was not found`
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
    const total = await cartServiceLayer.getCartTotalPrice(buyerId);
    let newOrder = await orderServiceLayer.createOrder({
      buyer_id: buyerId,
      total,
      order_status: "Preparing for Shipment",
      date_created: new Date(),
    })
    newOrder = newOrder.toJSON();

    // Create all the order items using cart items, 
    // while also updating quantity avaialble and sold for the products
    let cartItems = await cartServiceLayer.getCartItem(buyerId);
    cartItems = cartItems.toJSON();
    console.log(cartItems);
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
      console.log(orderServiceLayer.getOrder(1));
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
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

module.exports = router;