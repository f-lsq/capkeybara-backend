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

module.exports = { checkIfAuthenticated }