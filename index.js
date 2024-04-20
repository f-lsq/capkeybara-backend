// Set up express
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();

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