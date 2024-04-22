const bookshelf = require('../bookshelf');

// Create a new 'Product' model
const Product = bookshelf.model("Product", {
  tableName: "products",
  // Relationship between Product and Category (One to Many)
  category: function() {
    return this.belongsTo("Category")
  }
})

// Create a new 'Category' model
const Category = bookshelf.model('Category', {
  tableName: 'categories',
  // Relationship between Product and Category (One to Many)
  products: function() {
    return this.hasMany("Product")
  }
})

module.exports = { Product, Category };