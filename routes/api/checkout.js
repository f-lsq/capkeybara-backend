const express = require('express');
const router = express.Router();

// Cart service layer
const cartServiceLayer = require('../../service-layer/cart');
const { checkIfAuthenticatedJWT } = require('../../middlewares');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get('/:userId', checkIfAuthenticatedJWT, async function (req, res) {
  try {
    const { userId } = req.params;
    if (req.payload.id === Number(userId)) {
      // 1. Create the line items
      const items = await cartServiceLayer.getCartItem(userId);
      const lineItems = [];

      // Create line items for each product in the user's cart
      for (let i of items) {
        const lineItem = {
          // quantity: set the quantity
          quantity: i.get('quantity'),
          // price_data: set the price
          price_data: {
            currency: 'SGD',
            // set the price of 1 item (in cent)
            unit_amount: (i.related('product').get('price') * 100).toFixed(0),
            // to store data of the product
            product_data: {
              name: i.related('product').get('name'),
              metadata: {
                product_id: i.get('product_id')
              }
            }
          }
        }

        // if the product has an image, add it to the invoice as well
        if (i.related('product').get('image_url')) {
          lineItem.price_data.product_data.images = [i.related('product').get('image_url')]
        }

        // push the finished lineItem into the array
        lineItems.push(lineItem);
      }
      
      // Creates line item for shipping (set as $2.00 per item)
      const responseSubtotalQty = await cartServiceLayer.getCartSubtotalAndQuantity(userId);
      const shippingLineItem = {
        quantity: responseSubtotalQty[1],
        price_data: {
          currency: "SGD",
          unit_amount: 2 * 100,
          product_data: {
            name: "Shipping Fee",
            images: ["https://cdn-icons-png.flaticon.com/512/66/66841.png"]
          }
        }
      }
      lineItems.push(shippingLineItem);

      // 2. Create a payment session
      const payment = {
        mode: 'payment',
        payment_method_types: ['card', 'paynow'],
        line_items: lineItems,
        success_url: process.env.STRIPE_SUCCESS_URL, // must use an absolute URL!!!!
        cancel_url: process.env.STRIPE_CANCEL_URL,
        metadata: {
          user_id: userId
        }
      }

      // 3. Register the payment session with stripe and return its id
      const paymentSession = await Stripe.checkout.sessions.create(payment);

      res.status(200).json({
        sessionId: paymentSession.id
      })
    } else {
      res.status(400).json({
        "error": "Access denied: you can only access your own payment processing"
      })
    }

  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }

})

module.exports = router;