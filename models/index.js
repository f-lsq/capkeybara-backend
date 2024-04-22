const bookshelf = require('../bookshelf');

// Create a new 'Product' model
const Product = bookshelf.model("Product", {
  tableName: "products"
})

module.exports = { Product };