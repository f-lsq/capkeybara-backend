// Dependencies
const jwt = require('jsonwebtoken');

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
  const authHeader = req.header.authorizaiton;

  if (authHeader) {
    // extracts JWT (with no 'Bearer' infront)
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    })
  } else {
    res.sendStatus(401);
    res.json({
      "error": "Login required to access this route"
    })
  }
}


module.exports = { checkIfAuthenticated, checkIfAuthenticatedJWT }