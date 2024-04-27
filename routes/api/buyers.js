const express = require('express');
const router = express.Router();

const buyerServiceLayer = require('../../service-layer/buyers');
const { getHashedPassword, generateAccessToken } = require('../../utils');

// Gets all buyer information
router.get('/', async (req, res) => {
  res.send(await buyerServiceLayer.getAllBuyers());
})

// Creates a new buyer during sign up
router.post('/', async (req, res) => {
  try {
    const { password, confirm_password, ...data } = req.body;
    const buyerData = {
      ...data,
      password: await getHashedPassword(password)
    }
    const newBuyer = await buyerServiceLayer.createBuyer(buyerData);
    if (newBuyer.error) {
      res.status(400).json(newBuyer.error)
    } else {
      res.status(200).json({
        "message": "New account created succesfully",
        "data": newBuyer
      })
    }
  } catch(e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Verify buyer during login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyerData = await buyerServiceLayer.getBuyerByLoginCredentials(email, password);
    const accessToken = generateAccessToken(buyerData.id, buyerData.username, buyerData.email);
    res.send({
      "message": "Login successful.",
      "token": accessToken
    })
  } catch {
    res.status(400).json({
      "error": e.message
    })
  }
})

router.post("/forgot-password", async (req, res) => {

})

router.post("/update-password", async (req, res) => {

})

module.exports = router;