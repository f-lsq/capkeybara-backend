// Dependencies
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const FileStore = require("session-file-store")(session); // Calls 'session-file-store' function and pass 'session' as parameter
const csurf = require('csurf');
require('dotenv').config();

// Set up express
const app= express();

// Use hbs for view engine 
app.set("view engine", "hbs");

// Enable static folder
app.use(express.static("public"));

// Enable wax-on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// Enable form processing
app.use(
  express.urlencoded({
    "extended": false
  })
)

// Enable sessions
app.use(session({
  store: new FileStore(), // store session data in files
  secret: process.env.SESSION_SECRET_KEY, // secret key
  resave: false,
  saveUninitialized: true // if a browser connects to the server without a session, create a new one immediately
}))

// Enable flash messages (must be after sessions)
app.use(flash());
app.use((req,res,next) => {
  //console.log(req.session);
  
  // Allows HBS files to access flash messages
  // - Success messages
  res.locals.success_messages = req.flash('success_messages');
  // - Error messages
  res.locals.error_messages = req.flash('error_messages')
  next();
})

// Share the current login user information with all hbs file
app.use((req, res, next) => {
  res.locals.admin = req.session.admin;
  next();
})

// Enable csurf for CSRF protection
app.use(csurf());

// Middleware to share CSRF token with all hbs files (must be after sessions)
// - Token expires after 5-10 minutes
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
})

// Middleware to handle csrf errors
app.use((err, req, res, next) => {
  // if the middleware function has 4 parameters, then 
  // it is an error handler for the middleware directly before it
  if (err && err.code == "EBADCSRFTOKEN") {
    req.flash("error_messages", "The form has expired, please try again")
    res.redirect("back"); // go back one page (similar to pressing the back button)
  } else { 
    next(); // no error, go next middleware (send request to route if no more middleware)
  }
})

async function main() {
  // Routes 

  const landingRoutes = require("./routes/landing");
  const productRoutes = require("./routes/products");
  const adminRoutes = require("./routes/admin");
  const cloudinaryRoutes = require("./routes/cloudinary");

  // Use the landing routes
  app.use("/", landingRoutes);
  app.use("/products", productRoutes);
  app.use("/admin", adminRoutes);
  app.use('/cloudinary', cloudinaryRoutes);
  
}

main();


const PORT_NUMBER = 3001;
app.listen(PORT_NUMBER, () => {
  console.log(`Server started at http://localhost:${PORT_NUMBER}/`);
})