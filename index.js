// Set up express
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const FileStore = require("session-file-store")(session); // Calls 'session-file-store' function and pass 'session' as parameter
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
  secret: "keyboard cat", // secret key
  resave: false,
  saveUninitialized: true // if a browser connects to the server without a session, create a new one immediately
}))

// Enable flash messages (Relies on sessions)
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


async function main() {
  // Routes 

  const adminRoutes = require("./routes/admin");
  const productRoutes = require("./routes/products");

  // Use the landing routes
  app.use("/admin", adminRoutes);
  app.use("/products", productRoutes);
  
  
}

main();


const PORT_NUMBER = 3001;
app.listen(PORT_NUMBER, () => {
  console.log(`Server started at http://localhost:${PORT_NUMBER}/`);
})