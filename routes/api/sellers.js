const express = require('express');
const router = express.Router();

const sellerServiceLayer = require('../../service-layer/sellers');

// Gets all seller information
router.get('/', async (req, res) => {
  res.send(await sellerServiceLayer.getAllSellers());
})

module.exports = router;