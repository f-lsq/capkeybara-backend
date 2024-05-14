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
      res.status(403).json({
        "error": "Buyer already exist",
        existingBuyer
      })
    }
  }
  catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Gets a buyer by ID
router.get('/:buyerId', async (req, res) => {
  try {
    const { buyerId } = req.params;
    const existingBuyer = await buyerServiceLayer.getBuyerById(buyerId);
    if (existingBuyer) {
      res.status(200).json({
        "success": `Buyer of ID ${buyerId} found`,
        existingBuyer
      });
    } else {
      res.status(400).json({
        "error": `Buyer of ID ${buyerId} not found`
      })  
    }  
  } catch (e) {
    res.status(400).json({
      "error": e.message
    })
  }
})

// Get a buyer's information by decoding JWT
router.post("/profile", checkIfAuthenticatedJWT, async (req, res) => {
  try {
    const payload = req.payload;
  res.status(200).json({
    payload
  });
  } catch (e) {
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

// Verify buyer during login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyerData = await buyerServiceLayer.getBuyerByLoginCredentials(email, password);
    if (buyerData) {
      const accessToken = generateAccessToken(buyerData, process.env.TOKEN_SECRET, '15m', 'buyer');
      const refreshToken = generateAccessToken(buyerData, process.env.REFRESH_TOKEN_SECRET, '7d', 'buyer');

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
    first_name: payload.first_name,
    username: payload.username,
    email: payload.email,
  }, process.env.TOKEN_SECRET, '15m', 'buyer');

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

  await tokenServiceLayer.createBlacklistedToken(payload.refreshToken);
  res.status(204).json({
    "message": "Logged out successfully"
  })

})

module.exports = router;