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

const Buyer = bookshelf.model('Buyer', {
  tableName: 'buyers'
})

const Admin = bookshelf.model('Admin', {
  tableName: 'admins'
})

const Seller = bookshelf.model('Seller', {
  tableName: 'sellers'
})

module.exports = { Product, Category, Buyer, Admin, Seller };