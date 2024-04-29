// Dependencies
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils');
const tokenServiceLayer = require('../service-layer/tokens');

// Middleware to check if the user has access to a page
const checkIfAuthenticated = (req, res, next) => {
  // If there is an admin object in the session, the admin is logged in
  if (req.session.admin) {
    next();
  } else {
    req.flash('error_messages', 'Sorry you need to login to access this page');
    res.status(401);
    res.redirect('/admin/login');
  }
}


// Middleware to check if a valid JWT has been provided
const checkIfAuthenticatedJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // extracts JWT (with no 'Bearer' infront)
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
      if (error) {
        return res.status(403).json('Invalid token');
      } else {
        req.payload = payload;
        next();
      }    
    })
  } else {
    res.status(401).json({
      "error": "Login required to access this route"
    })
  }
}

// Middleware to send a refresh token if the access token expires
const checkIfAuthenticatedRefreshJWT = async (req, res, next) => {
  let { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const invalidRefreshToken = await tokenServiceLayer.isBlacklistedToken(refreshToken);
  if (invalidRefreshToken) {
    return res.status(401).json({
      "message": "The refresh token has already expired"
    })
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return res.status(403).json('Invalid token')
    } 
      req.payload = {
        ...payload,
        refreshToken,
      }
      next();
  })
}


module.exports = { 
  checkIfAuthenticated, 
  checkIfAuthenticatedJWT,
  checkIfAuthenticatedRefreshJWT }