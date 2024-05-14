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
      res.status(403).json({
        "error": "Seller already exist",
        existingSeller
      })
    }
  }
  catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Gets a seller by ID
router.get('/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const existingSeller = await sellerServiceLayer.getSellerById(sellerId);
    if (existingSeller) {
      res.status(200).json({
        "success": `Seller of ID ${sellerId} found`,
        existingSeller
      });
    } else {
      res.status(400).json({
        "error": `Seller of ID ${sellerId} not found`
      })
    }
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Get a seller's information by decoding JWT
router.post("/profile", checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const payload = req.payload;
    res.status(200).json({
      payload
    });
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

// ===================================================
// ROUTES FOR AUTHENTICATION
// ===================================================

// Verify seller during login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const sellerData = await sellerServiceLayer.getSellerByLoginCredentials(email, password)
    if (sellerData) {
      const accessToken = generateAccessToken(sellerData, process.env.TOKEN_SECRET, '15m', 'seller');
      const refreshToken = generateAccessToken(sellerData, process.env.REFRESH_TOKEN_SECRET, '7d', 'seller');

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
        "message": "Login successful."
      })
    } else {
      res.status(401).json({
        "error": "Invalid login credentials"
      })
    }
  } catch (e) {
    res.status(500).json({
      "error": e.message
    })
  }
})

router.post('/refresh', checkIfAuthenticatedRefreshJWT, async (req, res) => {
  const payload = req.payload;

  let accessToken = generateAccessToken({
    id: payload.id,
    name: payload.name,
    username: payload.username,
    email: payload.email,
  }, process.env.TOKEN_SECRET, '15m', 'seller');
  
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

  // Replacing old cookies with one that expires immediately
  res.cookie("accessToken", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(1)
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(1)
  });

  // Replacing old cookies with one that expires immediately
  await tokenServiceLayer.createBlacklistedToken(payload.refreshToken);
  res.status(204).json({
    "message": "Logged out successfully"
  })

})

module.exports = router;