const express = require('express');
const router = express.Router();


const buyerServiceLayer = require('../../service-layer/buyers');
const tokenServiceLayer = require('../../service-layer/tokens');
const { getHashedPassword, generateAccessToken } = require('../../utils');
const { checkIfAuthenticatedJWT, checkIfAuthenticatedRefreshJWT } = require('../../middlewares');

// Gets all buyer information
router.get('/', async (req, res) => {
  res.send(await buyerServiceLayer.getAllBuyers());
})

// Creates a new buyer during sign up
router.post('/', async (req, res) => {
  try {
    const { password, confirm_password, ...data } = req.body;
    const existingBuyer = await buyerServiceLayer.getBuyerBySignupCredentials(data.username, data.email);
    if (!existingBuyer) {
      if (Object.values(data).every(v => v.length > 0) && Object.values(data).length > 2) { // Checks if there are empty string in data object
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
      } else {
        res.status(200).json({
          "message": "Moving to second signup page. Please provide more details for complete sign up."
        })
      }
      
    } else {
      res.status(403).json(existingBuyer)
    }
    }
     catch(e) {
      res.status(400).json({
      "error": e.message
    })
  }
})

// Get information of a particular buyer
router.get("/profile", checkIfAuthenticatedJWT, async (req, res) => {
  const payload = req.payload;
  res.status(200).json({
    payload
  });
})

router.post("/forgot-password", async (req, res) => {
})

router.post("/update-password", async (req, res) => {
})

// ===================================================
// ROUTES FOR AUTHENTICATION
// ===================================================

// Verify buyer during login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyerData = await buyerServiceLayer.getBuyerByLoginCredentials(email, password)
    if (buyerData) {
      const accessToken = generateAccessToken(buyerData, process.env.TOKEN_SECRET, '10s', 'buyer');
      const refreshToken = generateAccessToken(buyerData, process.env.REFRESH_TOKEN_SECRET, '1m', 'buyer');

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict', // 'None' for HTTPS
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict', // 'None' for HTTPS
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
        "success": "Login successful"
      })
    } else {
      res.status(401).json({
        "error": "Invalid login credentials"
      })
    }
  } catch(e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

router.post('/refresh', checkIfAuthenticatedRefreshJWT, async (req, res) => {
  const payload = req.payload;
  let accessToken = generateAccessToken({
    id: payload.id,
    username: payload.username,
    email: payload.email,
  }, process.env.TOKEN_SECRET, '15m');

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'strict', // 'None' for HTTPS
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  })

  res.status(200).json({
    accessToken
  })
})

router.post('/logout', checkIfAuthenticatedRefreshJWT, async (req, res) => {
  const payload = req.payload;
  res.clearCookie;
  await tokenServiceLayer.createBlacklistedToken(payload.refreshToken)
  res.status(204).json({
    "message": "Logged out successfully"
  })

})

module.exports = router;