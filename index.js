// Dependencies
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const session = require("express-session");
const flash = require("connect-flash");
const FileStore = require("session-file-store")(session); // Calls 'session-file-store' function and pass 'session' as parameter
const csrf = require("csurf");
const cors = require("cors");
const cookieparser = require("cookie-parser");

// Configuring dotenv and set up express
require("dotenv").config();
const app= express();

// Use hbs for view engine 
app.set("view engine", "hbs");

// Enable static folder
app.use(express.static("public"));

// Enable wax-on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// Middleware to parse request body
app.use(
  express.urlencoded({
    "extended": false
  })
)

// Middleware to parse cookies
app.use(cookieparser());

// Enable CORS (before sessions)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

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
const csrfInstance = csrf();
app.use((req, res, next) => {
  // Disable CSRF for Stripe Webhook or API
  if (req.url.slice(0,5) == "/api/") {
    return next()
  }
  csrfInstance(req, res, next);
})

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


const api = {
  products: require('./routes/api/products'),
  buyers: require('./routes/api/buyers'),
  sellers: require('./routes/api/sellers'),
  cart: require('./routes/api/cart'),
  checkout: require('./routes/api/checkout'),
  orders: require('./routes/api/orders')
}

async function main() {
  // Routes 
  const landingRoutes = require("./routes/landing");
  const productRoutes = require("./routes/products");
  const adminRoutes = require("./routes/admin");
  const cloudinaryRoutes = require("./routes/cloudinary");
  const checkoutRoutes = require('./routes/checkout');

  // Use the landing routes
  app.use("/", landingRoutes);
  app.use("/products", productRoutes);
  app.use("/admin", adminRoutes);
  app.use('/cloudinary', cloudinaryRoutes);
  app.use('/checkout', checkoutRoutes)

  // Use api routers
  app.use('/api/products', express.json(), api.products);
  app.use('/api/buyers', express.json(), api.buyers);
  app.use('/api/sellers', express.json(), api.sellers);
  app.use('/api/cart', express.json(), api.cart);
  app.use('/api/checkout', express.json(), api.checkout);
  app.use('/api/orders', express.json(), api.orders);
}

main();

const PORT_NUMBER = process.env.PORT || 3001;
app.listen(PORT_NUMBER, () => {
  console.log(`Server started at http://localhost:${PORT_NUMBER}/`);
})