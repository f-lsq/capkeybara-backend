const express = require('express');
const router = express.Router();

const sellerServiceLayer = require('../../service-layer/sellers');
const tokenServiceLayer = require('../../service-layer/tokens');
const { getHashedPassword, generateAccessToken } = require('../../utils');
const { checkIfAuthenticatedJWT, checkIfAuthenticatedRefreshJWT } = require('../../middlewares');

// Gets all seller information
router.get('/', async (req, res) => {
  res.send(await sellerServiceLayer.getAllSellers());
})

// Creates a new seller during sign up
router.post('/', async (req, res) => {
  try {
    const { password, confirm_password, ...data } = req.body;
    const existingSeller = await sellerServiceLayer.getSellerBySignupCredentials(data.username, data.email);
    if (!existingSeller) {
      if (Object.values(data).every(v => v.length > 0) && Object.values(data).length > 2) { // Checks if there are empty string in data object
        const sellerData = {
          ...data,
          password: await getHashedPassword(password)
        }
        const newSeller = await sellerServiceLayer.createSeller(sellerData);
        if (newSeller.error) {
          res.status(400).json(newSeller.error)
        } else {
          res.status(200).json({
            "message": "New account created succesfully",
            "data": newSeller
          })
        }
      } else {
        res.status(200).json({
          "message": "Moving to second signup page. Please provide more details for complete sign up."
        })
      }
      
    } else {
      res.status(403).json(existingSeller)
    }
    }
     catch(e) {
      res.status(400).json({
      "error": e.message
    })
  }
})

router.get("/profile", checkIfAuthenticatedJWT, async (req, res) => {
  const payload = req.payload;
  res.send(payload);
})

router.post("/forgot-password", async (req, res) => {
})

router.post("/update-password", async (req, res) => {
})

// ===================================================
// ROUTES FOR AUTHENTICATION
// ===================================================

// Verify seller during login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const sellerData = await sellerServiceLayer.getSellerByLoginCredentials(email, password)
    if (sellerData) {
      const accessToken = generateAccessToken(sellerData, process.env.TOKEN_SECRET, '15m');
      const refreshToken = generateAccessToken(sellerData, process.env.REFRESH_TOKEN_SECRET, '7d');

      // res.cookie('token', refreshToken, {
      //   httpOnly: true,
      //   sameSite: 'None', // 'None' for HTTPS
      //   secure: true,
      //   maxAge: 24 * 60 * 60 * 1000
      // })

      return res.status(200).json({
        "message": "Login successful.",
        "id": sellerData.id,
        "username": sellerData.username,
        "name": sellerData.name,
        "email": sellerData.email,
        "token": accessToken,
        "refreshToken": refreshToken
      })
    } else {
      res.status(401).json({
        "response": "Invalid login credentials"
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
  res.status(200).json({
    accessToken
  })
})

router.post('/logout', checkIfAuthenticatedRefreshJWT, async (req, res) => {
  const payload = req.payload;
  await tokenServiceLayer.createBlacklistedToken(payload.refreshToken)
  res.status(204).json({
    "message": "Logged out successfully"
  })

})

module.exports = router;