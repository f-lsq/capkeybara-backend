const express = require('express');
const router = express.Router();

// Cart service layer
const cartServiceLayer = require('../service-layer/cart');
const { checkIfAuthenticated } = require('../middlewares');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get('/', [checkIfAuthenticated], async function(req, res) {
  // 1. Create the line items
  //    Each line item is each thing the user is going to pay for  
  const items = await cartServices.getCart(req.session.user.id);
  const lineItems = []; 
  // each lineItem is an object, and
  // only certain keys can be used

  for (let i of items) {
    // when creating a line item, the keys that we can use is defined by Stripe,
    // we cannot use our own keys
    const lineItem = {
      // quantity: set the quantity
      quantity: i.get('quantity'),
      
      // price_data: set the price
      price_data: {
        currency: 'SGD',
        // set the price of 1 item
        unit_amount: i.related('product').get('cost'),
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

  // 2. Create a payment session
  const payment = {
    mode: 'payment',
    payment_method_types: ['card', 'paynow'], // PayNow
    line_items: lineItems,
    success_url: process.env.STRIPE_SUCCESS_URL, // must use an absolute URL!!!!
    cancel_url: process.env.STRIPE_CANCEL_URL,
    metadata: {
      user_id: req.session.userId
    }
  }

  // 3. Register the payment session with stripe and return its id
  const paymentSession = await Stripe.checkout.sessions.create(payment);

  // send payment session id to hbs - browser will then use that payment session id to make payment at Stripe
  res.render('checkouts/index', {
    sessionId: paymentSession.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
})

// Success checkout
router.get('/success', function(req, res){
  res.render('checkouts/success');
})

// Failure checkout
router.get('/cancel', function(req, res){
  res.render('checkouts/cancel');
})

module.exports = router;